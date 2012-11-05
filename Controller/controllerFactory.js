/**
 * Responsible for taking an object which contains a .controller, .module attribute to
 * then build a path to a specific Controller class.
 */
require('mootools');
var fs = require('fs');

Xylesoft.component.ControllerFactory = new Class({
    Implements: [Options],
    options: {
	moduleDir: null
    },
    initialize: function(options) {
	console.log('Xylesoft.component.ControllerFactory Loaded');
	this.setOptions(options);

	if (this.options.moduleDir === null) {
	    throw new Error('Xylesoft.componet.ControllerFactory: The option `moduleDir` is undefined');
	}

	if (! fs.existsSync(this.options.moduleDir)) {
	    throw new Error('Xylesoft.component.ControllerFactory: can\'t find controller file=' + this.options.config);	    
	}

	console.log('Controller\'s module directory: ' + this.options.moduleDir);

	// Loading controller classes into memory.
	var modules = fs.readdirSync(this.options.moduleDir + '/Module');
	this.loadControllers(modules);
	this.loadViews(modules);
    },

    loadControllers: function(modules) {
	var that = this;
	modules.each(function(module, index, array) {
	    var modulePath = that.options.moduleDir + '/Module/' + module + '/Controller';
	    console.log(modulePath + '\'s being loaded');

	    // get controller file names
	    var controllers = fs
		.readdirSync(modulePath)
		.filter(function(filename, index) {
		    // filter by .js file in the controller directory.
		    return (/[a-z][a-z0-9]+\.js$/g).exec(filename);
		});

	    // require the controllers into Xylesoft.controllers.* 
	    controllers.each(function(controller, index, array) {
		require(modulePath + '/' + controller);
	    });
	});
	
	console.log('Loaded Controllers: ' + Object.keys(Xylesoft.controllers));
    },

    loadViews: function(modules) {
	var that = this;
	modules.each(function(module, index, array) {
	    var modulePath = that.options.moduleDir + '/Module/' + module + '/View';
	    console.log(modulePath + '\'s being loaded');

	    // get controller file names
	    var views = fs
		.readdirSync(modulePath)
		.filter(function(filename, index) {
		    // filter by .js file in the controller directory.
		    return (/[a-z][a-z0-9]+\.js$/g).exec(filename);
		});

	    // require the controllers into Xylesoft.views.* 
	    views.each(function(view, index, array) {
		require(modulePath + '/' + view);
	    });
	});
	
	console.log('Loaded Views: ' + Object.keys(Xylesoft.views));
    },

    /** 
     * Attempts to find the specific JS file containing the class
     */
    find: function(route) {
	var controllerName = route.module + route.controller + 'Controller';
	console.log('Providing Controller: ' + controllerName);
	
//	var controllerName = module.controller + 'Controller';
	return new Xylesoft.controllers[controllerName];
    }
});