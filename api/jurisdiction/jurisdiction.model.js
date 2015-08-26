/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up Report Schema
var JurisdictionSchema = new Schema({
	JurisdictionID: String,
    County: String,
    Jurisdiction: String,
    'Total Lane Miles': String,
    'Total Centerline Miles': String,
    'Last P-TAP Award Round': String,
    'Certification Date': String
 
});

//Add schema to a mongoose model

module.exports = mongoose.model('Jurisdiction', JurisdictionSchema);
