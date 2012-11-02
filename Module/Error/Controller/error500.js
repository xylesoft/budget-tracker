require('mootools');
require('../../../Controller/Controller');

/**
 *The Error 500 Controller
 *
 */
Xylesoft.controllers.ErrorsError500Controller = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.ErrorsError500Controller',
    executeGET: function(request) {
	return 'HTTP Server Error 500 occured.';
    }
});
