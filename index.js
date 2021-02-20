var fs = require('fs');
var path = require('path');
var finder = require('find-package-json');
var Module = require('module');
var originalRequire = Module.prototype.require;

var cacheRootPaths = {};
var cacheModulePaths = {};

module.exports = function(filePath, scope, disableMavenStructure) {
 
  var callerLocation;
  if(cacheModulePaths[filePath]){
    callerLocation = cacheModulePaths[filePath];
  }else{
    callerLocation = getCalleeInfo().location;
    cacheModulePaths[filePath] = callerLocation;
  }  

  var rootPath;
  if(cacheRootPaths[callerLocation]){
    rootPath = cacheRootPaths[callerLocation]
  }else{
    rootPath = getAppRootDirectory(callerLocation)
    cacheRootPaths[callerLocation] = rootPath;
  }
  
  if(typeof disableMavenStructure === 'undefined' || disableMavenStructure === false){
    if (scope === 'test') {
      rootPath += "/src/test";
    } else {
      rootPath += "/src/main";
    }     
  }
  
  var fullPath = path.join(rootPath, filePath);

  if (!fs.existsSync(fullPath) && !fs.existsSync(fullPath + '.js')) {
    throw new Error('Could not require requested module at ' + fullPath + ' because does not exist');
  }

  return require(fullPath);
};

function getAppRootDirectory(callerLocation) {
  var f = finder(callerLocation);
  return path.dirname(f.next().filename);
}

function getCalleeInfo() {
  var stack = new Error().stack.split("at ");
  var functionInfo = "" + stack[4].trim();
  var fileLocation = functionInfo.substring(functionInfo.indexOf("(") + 1, functionInfo.indexOf(":"));
  var lineInfo = functionInfo.split(":");
  return {
    location: fileLocation,
    line: lineInfo[1]
  };
}

Module.prototype.require = function(){
  var callerLocation;
  if(cacheModulePaths[arguments['0']]){
    callerLocation = cacheModulePaths[arguments['0']];
  }else{
    callerLocation = getCalleeInfo().location;
    cacheModulePaths[arguments['0']] = callerLocation;
  }  

  var rootPath;
  if(cacheRootPaths[callerLocation]){
    rootPath = cacheRootPaths[callerLocation]
  }else{
    rootPath = getAppRootDirectory(callerLocation)
    cacheRootPaths[callerLocation] = rootPath;
  }
  
  var initialPath = arguments['0'];
  var fullPath;
  try{
    fullPath = path.join(rootPath,"src","main", initialPath);
    arguments['0'] = fullPath;
    return originalRequire.apply(this, arguments);
  }catch(err1){
    if(process.env.NODE_REQUIRE_ENHANCER_LOG_LEVEL === "debug"){
      console.log(err1);      
    }
    try{
      fullPath = path.join(rootPath,"src","test", initialPath);
      arguments['0'] = fullPath;
      return originalRequire.apply(this, arguments);
    }catch(err2){
      if(process.env.NODE_REQUIRE_ENHANCER_LOG_LEVEL === "debug"){
        console.log(err2);      
      }
      arguments['0'] = initialPath;
      return originalRequire.apply(this, arguments);
    }
  }
};
