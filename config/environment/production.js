/*jslint node: true */
'use strict';

console.log('loading production database');

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

    // MongoDB connection options
    mongo: {
        uri: process.env.MONGOLAB_URL ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
            'mongodb://ptap:GISptap101@ds035613.mongolab.com:35613/ptap-production'

    }

};
