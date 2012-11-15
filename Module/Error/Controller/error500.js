require('mootools');
var Controller = require('../../../Controller/Controller');

/**
 *The Error 500 Controller
 *
 */
module.exports = new Class({
    Extends: Controller,
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
