]require('mootools');
var fs = require('fs');

Xylesoft.component.Router = new Class({
    Implements: [Options],
    options: {
        config: null
    },
    routes: {},
    initialize: function(options) {
        console.log('Xylesoft.component.Router Loaded');
        this.setOptions(options);

        this.loadConfig();
        this.prepareRouteInstances();
        console.log(this.routes);
    },

    loadConfig: function() {
        if (this.options.config === null) {
            throw new Error('Xylesoft.component.Router: option `config` is NULL');
        }

        if (! fs.existsSync(this.options.config)) {
            throw new Error('Xylesoft.component.Router: can\'t find config file=' + this.options.config);
        }

        var configObj = JSON.parse(fs.readFileSync(this.options.config));
        this.routes = configObj.routes;
        this.defaults = configObj.defaults;
    },

    /**
     * Responsible for looking at all the pattern properties in this.routes and converting to Regex instances based on the string.
     */
    prepareRouteInstances: function() {
        Object.each(this.routes, function(route, name, obj) {
            if (route.pattern) {
                obj[name].pattern = new RegExp(route.pattern);
            }
            if (!route.name) {
                // give the route a name.
                obj[name].name = name;
            }

            obj[name].httpStatus = 200;
        });
    },

    /**
     * Responsible for converting the URL and request to a controller and module.
     */
    find: function(request) {
        var url = request.url;
        var method = request.method;

        var route = this.getRoute(url);

        // check we have a route, if not throw error404.
        route = route || this.defaults.errors[404];

        if (! route.methods.contains(method)) {
            if (route.name === "error.404") {
                return this.defaults.errors[500];
            }

            return  this.defaults.errors[404];
        }

        // we now have the right controller based on the route and methods.


        return route;
    },

    getRoute: function(url) {
        var gotRoute = false;
        var foundRoute = null;
        Object.each(this.routes, function(route, name, routes) {
            if (gotRoute) return;

            if (route.pattern.exec(url)) {
                gotRoute = true;
                foundRoute = route;
            }
        });
        return foundRoute;
    }
});
