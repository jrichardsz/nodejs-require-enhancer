var fs = require('fs');
var path = require('path');
var finder = require('find-package-json');
var Module = require('module');
var originalRequire = Module.prototype.require;

var cacheRootPaths = {};
var cacheModulePaths = {};


Module.prototype.require = function() {

  try {
    return originalRequire.apply(this, arguments);
  } catch (err) {
    if(err.code !== 'MODULE_NOT_FOUND'){
      throw err;
    }
    var callerLocation;
    if (cacheModulePaths[arguments['0']]) {
      callerLocation = cacheModulePaths[arguments['0']];
    } else {
      callerLocation = this.filename;
      cacheModulePaths[arguments['0']] = callerLocation;
    }

    var rootPath;
    if (cacheRootPaths[callerLocation]) {
      rootPath = cacheRootPaths[callerLocation]
    } else {
      rootPath = getAppRootDirectory(callerLocation)
      cacheRootPaths[callerLocation] = rootPath;
    }

    var initialPath = arguments['0'];
    var fullPath;
    try {
      fullPath = path.join(rootPath, "src", "main", initialPath);
      arguments['0'] = fullPath;
      return originalRequire.apply(this, arguments);
    } catch (err1) {
      if(err1.code !== 'MODULE_NOT_FOUND'){
        throw err1;
      }
      try {
        fullPath = path.join(rootPath, "src", "test", initialPath);
        arguments['0'] = fullPath;
        return originalRequire.apply(this, arguments);
      } catch (err2) {
        if(err2.code !== 'MODULE_NOT_FOUND'){
          throw err2;
        }
        throw new Error(`${initialPath} was not found as npm module, neither in ${rootPath}/src/main nor in ${rootPath}/src/test. Caller: ${this.filename}`);
      }
    }
  }
};

function getAppRootDirectory(callerLocation) {
  var f = finder(callerLocation);
  return path.dirname(f.next().filename);
}
