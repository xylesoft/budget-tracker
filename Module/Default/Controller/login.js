require('mootools');
require('../../../Controller/Controller');

/**
 *The Default Login Controller
 *
 */
Xylesoft.controllers.DefaultLoginController = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.DefaultLoginController',
    module: 'Default',
    executeGET: function(request) {
	return 'ImHere';
    }
});
