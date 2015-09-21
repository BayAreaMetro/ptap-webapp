/*jslint node: true */

/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var debug = require('debug')('ptap-webaap');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connected');
});

var app = express();
var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes')(app);



// Start server
app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
    console.log('App running on port: ' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});

// Expose app
exports = module.exports = app;
