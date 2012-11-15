/**
 * The view factory object is responsbile for loading, caching and returning new view 
 * instances.
 *
 * @author Jeramy Wenserit <jeramy@xylesoft.co.uk>  
 */

require('mootools');
var fs = require('fs');

module.exports = new Class({
    Implements: [Options],
    views: {},
    options: {
        moduleDir: null
    },
    initialize: function(options) {
        console.log('ViewFactory Loaded');
        this.setOptions(options);

        if (this.options.moduleDir === null) {
            throw new Error('ViewFactory: The option `moduleDir` is undefined');
        }

        if (! fs.existsSync(this.options.moduleDir) || ! fs.statSync(this.options.moduleDir).isDirectory()) {
            throw new Error('ViewFactory: can\'t find module directory:' + this.options.moduleDir);
        }

        console.log('View\'s module directory: ' + this.options.moduleDir);

        // Loading controller classes into memory.
        var modules = fs.readdirSync(this.options.moduleDir);

        this.loadViews(modules);
    },

    /**
     * Iterates over the available module directories, then require and cache
     * each view object into the factory ready for use later on.
     *
     * @param String modules
     */
    loadViews: function(modules) {
        var that = this;
        modules.each(function(module, index, array) {
            var moduleViewsPath = that.options.moduleDir + '/' + module + '/View';

            // determine if the module is a directory.
            var stats = fs.statSync(moduleViewsPath);
            if (stats && stats.isDirectory()) {

                var views = fs
                    .readdirSync(moduleViewsPath)
                    .filter(function(filename, index) {
                        // filter by .js file in the controller directory.
                        return (/[a-z][a-z0-9]+\.js$/g).exec(filename);
                    });

                // require the views into views.*
                if (views && views.length) {
                    views.each(function(view, index, array) {
                        that.views[that.buildViewName(module, view)] = require(moduleViewsPath + '/' + view);
                    });
                }
            }
        });
        
        console.log('Loaded views: \n\t' + Object.keys(that.views).join('\n\t'));
    },

    /**
     * Creates a common class name based on the module and view.
     * For example, module=Default and View=index, this method 
     * will return 'DefaultIndexView'
     *
     * @param String module
     * @param String view
     * @return String
     */ 
    buildViewName: function(module, view) {
        if ((/\.js$/g).exec(view)) {
            view = view.substring(0, view.length-3);
        }

        // Convert 'index' to 'Index'
        view = view[0].toUpperCase() + view.substring(1, view.length);
        module = module[0].toUpperCase() + module.substring(1, module.length);
        return module + view + 'View';
    },

    /**
     * Responsible for returning the correct view object.
     *
     * @param String module
     * @param String view
     * @return Object
     */
    find: function(module, view) {
        var name = this.buildViewName(module, view)
        return (this.views[name]) ? (new (this.views[name])) : null;
    }
});