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
    controllers: {}
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

Xylesoft.httpServer = http.createServer(function(request, response) {
    Xylesoft.log('IP: ' + request.connection.remoteAddress +' Request ' + request.method + ': URL=' + request.url);

    var route = Xylesoft.router.find(request);

    Xylesoft.log('Using route: ' + route.name);

    var controller = Xylesoft.controllerFactory.find(route);

    console.log(controller);
    controller.dispatch(request, response);
//    console.log(.dispatch(request, response);

//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World");
//    response.end();
}).listen(8080);