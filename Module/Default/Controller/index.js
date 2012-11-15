require('mootools');
var Controller = require('../../../Controller/Controller');

/**
 *The Default Index Controller
 *
 */
module.exports = new Class({
    Extends: Controller,
    name: 'Xylesoft.controllers.DefaultIndexController',
    module: 'Default',
    executeGET: function(request, attributes) {
        attributes.name = 'Jeramy Wenserit';
        return 'IndexSuccess';
    }
});
