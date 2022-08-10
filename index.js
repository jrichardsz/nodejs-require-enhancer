var path = require('path');
var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function() {
    if (arguments['0'].startsWith("$/")) {
        var fullPath = path.join(process.env.npm_config_local_prefix, arguments['0'].substring(2));
        arguments['0'] = fullPath;
    }
    return originalRequire.apply(this, arguments);
}