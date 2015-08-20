'use strict';

console.log('loading dev database');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  
  mongo: {
    uri: 'mongodb://localhost/ptap-dev'
  }
};
