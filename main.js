/**
 * This is the main file for the Budget Tracker web application
 */

require('mootools');
var http = require("http");

/* Load the namespace */
var Xylesoft = require('./Lib/xylesoft-namespace/xylesoft.js');
Xylesoft.setVersion('0.1.1');
Xylesoft.log('Xylesoft Namespace v' + Xylesoft.version + ' - Booted @ ' +Xylesoft.basedir);
Xylesoft.addNamespace('controllers');
Xylesoft.addNamespace('views');

/* Load Dependancies */
Xylesoft.addNamespace('router');
Xylesoft.addComponent('Router', require('./Routing/router'));
Xylesoft.router = new (Xylesoft.getComponent('Router'))({
    config: Xylesoft.basedir + '/Config/defaults.json'
});

Xylesoft.addNamespace('controllerFactory');
Xylesoft.addComponent('controllerFactory', require('./Controller/controllerFactory'));

Xylesoft.controllerFactory = new (Xylesoft.getComponent('controllerFactory'))({
    moduleDir: Xylesoft.basedir + '/Module'
});

Xylesoft.addNamespace('viewFactory');
Xylesoft.addComponent('viewFactory', require('./View/viewFactory'));

Xylesoft.viewFactory = new (Xylesoft.getComponent('viewFactory'))({
    moduleDir: Xylesoft.basedir + '/Module'
});

//console.log(Xylesoft);
//process.exit();

//require('./View/viewFactory');
//Xylesoft.viewFactory = new Xylesoft.component.viewFactory({
//    moduleDir: Xylesoft.basedir
//});

Xylesoft.addNamespace('httpServer');
Xylesoft.httpServer = http.createServer(function(request, response) {
    Xylesoft.log('IP: ' + request.connection.remoteAddress +' Request ' + request.method + ': URL=' + request.url);

    var route = Xylesoft.router.find(request);

    Xylesoft.log('Using route: ' + route.name + ' = [ ' + route.pattern + ' ]');
    
    // Get the Controller
    var controller = Xylesoft.controllerFactory.find(route.module, route.controller);
    if (! controller) {
        controller = Xylesoft.controllerFactory.find('Error', 'error404');
    }
    
    // Execute the controller.
    var container = controller.dispatch(request);
    
    // Execute the view
    var useViewModule = container.module || route.module; 
    var view = Xylesoft.viewFactory.find(useViewModule, container.view);

    if (view) {
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
    } else {
        response.writeHead(500, {
            "Content-Type": "text/plain"
        });
        response.write("500 - Internal server error occurred. (Terminal)")
        response.end();
    }
}).listen(8080);