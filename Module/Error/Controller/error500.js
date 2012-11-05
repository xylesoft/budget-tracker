require('mootools');
require('../../../Controller/Controller');

/**
 *The Error 500 Controller
 *
 */
Xylesoft.controllers.ErrorError500Controller = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.ErrorError500Controller',
    executeGET: function(request) {
	return 'Error500';
    },
    executePOST: function(request) {
	return 'Error500';
    },
    executePUT: function(request) {
	return 'Error500';
    },
    executeDELETE: function(request) {
	return 'Error500';
    }
});
