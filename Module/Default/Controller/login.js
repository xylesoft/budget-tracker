require('mootools');
require('../../../Controller/Controller');

/**
 *The Default Login Controller
 *
 */
Xylesoft.controllers.DefaultLoginController = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.DefaultLoginController',
    executeGET: function(request) {
	return 'ImHere';
    }
});
