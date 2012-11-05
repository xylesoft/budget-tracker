require('mootools');

/**
 */
Xylesoft.views.DefaultIndexSuccess = new Class({
    executeText: function(request, attributes, response) {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write("Executed view DefaultIndexSuccess. Attributes:" + JSON.stringify(attributes));
        response.end();
    }
});
