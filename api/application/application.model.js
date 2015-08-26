/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Set up Report Schema
var ApplicationSchema = new Schema({
	uuid: String,
    jurisdiction: String,
    street_address: String,
    street_address2: String,
    city: String,
    state: String,
    zip: String,
    primary_title: String,
    primary_firstname: String,
    primary_lastname: String,
    primary_position: String,
    primary_phone: {
        type: String,
        lowercase: true
    },
    primary_email: String,
    streetsaver_title: String,
    streetsaver_firstname: String,
    streetsaver_lastname: String,
    streetsaver_position: String,
    streetsaver_phone: String,
    streetsaver_email: String,
    attended_training: String,
    last_user_meeting: String,
    last_major_inspection: String,
    pms_consultants: String,
    digitalmap_format: String,
    linked_basemap: String,
    option1: String,
    option2: String,
    option3: String,
    network_centerlinemiles: String,
    network_totalpercentage: String,
    network_milesforsurvey: {
        type: String,
        default: 'user'
    },
    network_milesremaining: String,
    network_additionalfunds: String,
    network_percentadditionalfunds: String,
    arterials: String,
    collectors: {
        type: String,
        default: 'user'
    },
    residentials: String,
    other: String,
    other_description: String,
    option2_projectdescription: String,
    option3_projectdescription: String,
    option3_anticipatedconstructiondate: String,
    option3_federalaideligible: String,
    option3_constructionfullyfunded: String,
    pms_grantamount: String,
    pms_localcontribution: String,
    pms_additionalfunds: String,
    pms_totalprojectcost: String,
    npt_totalprojectcost: String,
    npt_localcontribution: String,
    pdc_totalprojectcost: String,
    pdc_localcontribution: String,
    publicworksdirector: {
        fullname: String,
        title: String,
        contactnumber: String
    },
    applicationdate: String

});

//Add schema to a mongoose model

module.exports = mongoose.model('Application', ApplicationSchema);
