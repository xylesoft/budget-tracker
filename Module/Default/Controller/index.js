require('mootools');
require('../../../Controller/Controller');

/**
 *The Default Index Controller
 *
 */
Xylesoft.controllers.DefaultIndexController = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.DefaultIndexController',
    executeGET: function(request) {
	return 'ImHere';
    }
});
