var express = require('express');
var debug = require('debug')('ptap-webaap');


var app = express();
var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes/routes')(app);

// Start server
app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'), function() {
    console.log('App running on port: ' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});

// Expose app
exports = module.exports = app;

