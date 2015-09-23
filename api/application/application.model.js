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
    option1: {
        type: String,
        default: 'no'
    },
    option2: {
        type: String,
        default: 'no'
    },
    option3: {
        type: String,
        default: 'no'
    },
    network_centerlinemiles: String,
    network_totalpercentage: String,
    network_milesforsurvey: String,
    network_milesremaining: String,
    network_additionalfunds: String,
    network_percentadditionalfunds: String,
    arterials: {
        type: String,
        default: 'no'
    },
    collectors: {
        type: String,
        default: 'no'
    },
    residentials: {
        type: String,
        default: 'no'
    },
    other: {
        type: String,
        default: 'no'
    },
    other_description: String,
    option2_projectdescription: String,
    option2_estimatedcost: String,
    signs: {
        type: String,
        default: 'no'
    },
    stormdrains: {
        type: String,
        default: 'no'
    },
    curbs: {
        type: String,
        default: 'no'
    },
    gutters: {
        type: String,
        default: 'no'
    },
    sidewalks: {
        type: String,
        default: 'no'
    },
    trafficsignals: {
        type: String,
        default: 'no'
    },
    streetlights: {
        type: String,
        default: 'no'
    },
    otherasset: {
        type: String,
        default: 'no'
    },
    option2_otherassetdescription: String,
    option3_projectdescription: String,
    option3_anticipatedconstructiondate: String,
    option3_estimatedcost: String,
    option3_federalaideligible: String,
    option3_constructionfullyfunded: String,
    pms_grantamount: String,
    pms_localcontribution: String,
    pms_additionalfunds: String,
    pms_totalprojectcost: String,
    npt_grantamount: String,
    npt_totalprojectcost: String,
    npt_additionalfunds: String,
    npt_localcontribution: String,
    pdc_grantamount: String,
    pdc_totalprojectcost: String,
    pdc_additionalfunds: String,
    pdc_localcontribution: String,
    publicworksdirector_fullname: String,
    publicworksdirector_title: String,
    publicworksdirector_contactnumber: String,
    applicationdate: String

});

//Add schema to a mongoose model

module.exports = mongoose.model('Application', ApplicationSchema);
