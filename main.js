/**
 * This is the main file for the Budget Tracker web application
 */

require('mootools');
var http = require("http");

Xylesoft={
    version: '0.1',
    basedir: null,
    component:{},
    log: function(message) {
        console.log('['+(new Date()).toString()+'] ' + message);
    },
    controllers: {},
    views: {}
};
var baseParts = process.argv[1].split('/');
delete baseParts[baseParts.length-1];
Xylesoft.basedir = baseParts.join('/').substring(0, baseParts.join('/').length-1);
Xylesoft.log('XYLEOSFT NAMESPACE - Started @ ' +Xylesoft.basedir);

/* Load Dependancies */
require('./Routing/router');
Xylesoft.router = new Xylesoft.component.Router({
    config: Xylesoft.basedir + '/Config/defaults.json'
});

require('./Controller/controllerFactory');
Xylesoft.controllerFactory = new Xylesoft.component.ControllerFactory({
    moduleDir: Xylesoft.basedir
});

require('./View/viewFactory');
Xylesoft.viewFactory = new Xylesoft.component.viewFactory({
    moduleDir: Xylesoft.basedir
});

Xylesoft.httpServer = http.createServer(function(request, response) {
    Xylesoft.log('IP: ' + request.connection.remoteAddress +' Request ' + request.method + ': URL=' + request.url);

    var route = Xylesoft.router.find(request);

    Xylesoft.log('Using route: ' + route.name);

    var controller = Xylesoft.controllerFactory.find(route);

    var container = controller.dispatch(request);

    // make sure the view exists
    if (! Xylesoft.views[container.view]) {
        throw new Error('Can\'t find view `'+container.view+'`.');
    }
    var view = new Xylesoft.views[container.view];

    // trigger the response
    // bit hacky for determining the response content type
    var responseType = (view.headers && view.headers['Content-Type']) || 'text/plain';
    switch (responseType) {
    case "application/json":
        view.executeJson(Request, container.attributes, response); break;
    case "text/plain":
    default:
        view.executeText(request, container.attributes, response); break;
    }
}).listen(8080);