var path = require('path');

/*
For yarn2+/npm workspaces, the npm_config_local_prefix environment variable is injected by yarn/npm client. 
It must be the directory where the node_modules directory is located. 
Don't tested on windows!
*/
module.exports.include = function(nodejsModuleLocation) {
   var fullPath = path.join(process.env.npm_config_local_prefix, nodejsModuleLocation);
   return require(fullPath);
};