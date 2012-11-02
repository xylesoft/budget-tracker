require('mootools');
require('../../../Controller/Controller');

/**
 *The Error 404 Controller
 *
 */
Xylesoft.controllers.ErrorsError404Controller = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.ErrorsError404Controller',
    executeGET: function(request) {
	return 'ImHere';
    }
});
