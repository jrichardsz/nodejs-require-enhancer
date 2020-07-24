var fs = require('fs');
var path = require('path');
var finder = require('find-package-json');

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

  var functionInfo = "" + stack[3].trim();
  var fileLocation = functionInfo.substring(functionInfo.indexOf("(") + 1, functionInfo.indexOf(":"));
  var lineInfo = functionInfo.split(":");
  return {
    location: fileLocation,
    line: lineInfo[1]
  };
}
