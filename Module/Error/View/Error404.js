require('mootools');

/**
 * The view for Page not Found 404 errors.
 */
module.exports = new Class({
    executeText: function(request, attributes, response) {
        response.writeHead(404, {
            "Content-Type": "text/plain"
        });
        response.write("404 - Page Not Found")
        response.end();
    },

    executeJson: function(request, attributes, response) {
        response.writeHead(404, {
            "Content-Type": "application/json"
        });
        response.write(
            JSON.stringify({
                status: 404,
                meta: "404 - Page not found"
            })
        );
        response.end();
    }

});
