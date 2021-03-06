require('mootools');

/**
 * The View for Error 500 Responses.
 */
module.exports = new Class({
    executeText: function(request, attributes, response) {
        response.writeHead(500, {
            "Content-Type": "text/plain"
        });
        response.write("500 - Internal server error occurred.")
        response.end();
    }
});
