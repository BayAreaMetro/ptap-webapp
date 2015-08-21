/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

    // Pages
    app.use('/', require('./routes/pages'));

    // Reports
    app.use('/api/report', require('./api/report'));

   

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')

        .get(errors[404], function(req,res){
            console.log('undefined api');
        });

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            console.log('anything');
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
