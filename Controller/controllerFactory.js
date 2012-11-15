/**
 * Responsible for taking an object which contains a .controller, .module attribute to
 * then build a path to a specific Controller class.
 */
require('mootools');
var fs = require('fs');

module.exports = new Class({
    Implements: [Options],
    controllers: {},
    views: {},
    options: {
        moduleDir: null
    },
    initialize: function(options) {
        console.log('ControllerFactory Loaded');
        this.setOptions(options);

        if (this.options.moduleDir === null) {
            throw new Error('ControllerFactory: The option `moduleDir` is undefined');
        }

        if (! fs.existsSync(this.options.moduleDir) || ! fs.statSync(this.options.moduleDir).isDirectory()) {
            throw new Error('ControllerFactory: can\'t find module directory: ' + this.options.moduleDir);
        }

        console.log('Controller\'s module directory: ' + this.options.moduleDir);

        // Loading controller classes into memory.
        var modules = fs.readdirSync(this.options.moduleDir);

        this.loadControllers(modules);
    },

    /**
     * Creates a common class name based on the module and view.
     * For example, module=Default and Controller=index, this method 
     * will return 'DefaultIndexController'
     *
     * @param String module
     * @param String view
     * @return String
     */ 
    buildControllerName: function(module, controller) {
        if ((/\.js$/g).exec(controller)) {
            controller = controller.substring(0, controller.length-3);
        }

        controller = controller[0].toUpperCase() + controller.substring(1, controller.length);
        module = module[0].toUpperCase() + module.substring(1, module.length);
        return module + controller + 'Controller';
    },

    /**
     * Iterates over the available module directories, then require and cache
     * each controller object into the factory ready for use later on.
     *
     * @param String modules
     */
   loadControllers: function(modules) {
        var that = this;
        modules.each(function(module, index, array) {
            var moduleControllersPath = that.options.moduleDir + '/' + module + '/Controller';

            // determine if the module is a directory.
            var stats = fs.statSync(moduleControllersPath);
            if (stats.isDirectory()) {
                var controllers = fs
                    .readdirSync(moduleControllersPath)
                    .filter(function(filename, index) {
                        // filter by .js file in the controller directory.
                        return (/[a-z][a-z0-9]+\.js$/g).exec(filename);
                    });

                // require the controllers into controllers.*
                controllers.each(function(controller, index, array) {
                    that.controllers[that.buildControllerName(module, controller)] = require(moduleControllersPath + '/' + controller);
                });
            }
        });

        console.log('Loaded Controllers: \n\t' + Object.keys(that.controllers).join('\n\t'));
    },

    /**
     * Responsible for returning the correct controller object.
     *
     * @param String module
     * @param String controller
     * @return Object
     */
    find: function(module, controller) {
        var name = this.buildControllerName(module, controller);
        console.log('Controller Object: ' + name);
        return (this.controllers[name]) ? (new (this.controllers[name])) : null;
    }
});