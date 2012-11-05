require('mootools');
require('../../../Controller/Controller');

/**
 *The Error 404 Controller
 *
 */
Xylesoft.controllers.ErrorError404Controller = new Class({
    Extends: Xylesoft.component.Controller,
    name: 'Xylesoft.controllers.ErrorError404Controller',
    module: 'Error',
    executeGET: function(request, attributes) {
        attributes.headers = {};
        attributes.headers['Content-Type'] = 'application/json';
        return 'Error404';
    },
    executePOST: function(request) {
        return 'Error404';
    },
    executePUT: function(request) {
        return 'Error404';
    },
    executeDELETE: function(request) {
        return 'Error404';
    }
});
