/**
 * Responsible for taking an object which contains a .controller, .module attribute to
 * then build a path to a specific Controller class.
 */
require('mootools');

Xylesoft.component.Controller = new Class({
    Implements: [Options],
    name: 'Xylesoft.component.Controller',
    module: null,
    options: {
        headers: {
            httpStatus: 200
        }
    },
    initialize: function(options) {
        console.log('Xylesoft.component.Controller Loaded');
        this.setOptions(options);

    },

    /**
     * The dispatch method is responsible for triggering the correct execute*() routines.
     * Note * can be executeGET(), executePOST(), executePUT() or executeDELETE(). How ever they
     *          must exist in the extended class.
     */
    dispatch: function(request) {
        var func = 'execute' + request.method.toUpperCase();
        console.log('Triggering ' + this.name + '.' + func + '()');
        var attributes = {};
        var viewName = this[func](request, attributes);

        var container = {
            "attributes": attributes,
            "view": this.module + viewName
        };

        return container;
    }
});