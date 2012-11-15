require('mootools');
var Controller = require('../../../Controller/Controller');

/**
 *The Default Login Controller
 *
 */
module.exports = new Class({
    Extends: Controller,
    name: 'Xylesoft.controllers.DefaultLoginController',
    module: 'Default',
    executeGET: function(request) {
        return 'ImHere';
    }
});
