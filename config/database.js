'use strict';  

var express = require('express');
//Database var 
var mssql = require('mssql');
var router = express.Router();
//Development
var config = {
    user: 'rtpDevAppUser',
    password: 'GIS@rtpdev101',
    server: 'gisdb2.c4ttzt2cz0de.us-west-2.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
    database: 'rtp2017_dev'

};

var options = {
    table: '[sessions]' // Table to use as session store. Default: [sessions]
};

// Build
// var config = {
//     user: 'rtpTestUser',
//     password: 'GIS@rtptest101',
//     server: 'gisdb2.c4ttzt2cz0de.us-west-2.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
//     database: 'rtp2017_test'

// };
// Production
// var config = {
//     user: 'rtpLiveUser',
//     password: 'GIS@rtplive101',
//     server: 'gisdb2.c4ttzt2cz0de.us-west-2.rds.amazonaws.com', // You can use 'localhost\\instance' to connect to named instance
//     database: 'RTP2017_Production'

// };

router.connection = new mssql.Connection(config, function(err) {
    if (err)
        console.log(err);
});

router.db = config;
router.table = options;


module.exports = router;
