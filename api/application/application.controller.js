/*jslint node: true */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /application              ->  index
 * POST     /application              ->  create a application
 * GET      /application/:id          ->  show specific application
 * POST     /application/:id          ->  update
 * GET      /application/remove/:id   ->  destroy
 * GET      /application/download     ->  download as excel file
 */

'use strict';
var _ = require('lodash');
var Application = require('./application.model');
var uuid = require('node-uuid');
var sendgrid = require('sendgrid')('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');
var json2xls = require('json2xls');
var fs = require('fs');
var path = require('path');

/**
 * Get list of applications
 */
exports.index = function(req, res) {

    Application.find({}, function(err, applications) {
        if (err) return res.send(500, err);
        res.json(200, applications);
    });
};

/**
 * Creates a new application (Section 1)
 */
exports.create = function(req, res, next) {
    console.log('running create application');
    console.log(req.body);
    var newapplication = new Application(req.body);
    var emailConfirmation = req.body.emailconfirmation;

    newapplication.uuid = req.params.id;
    console.log(req.params.id);
    newapplication.save(function(err, application) {
        if (err) return console.error(err);

        res.json(application);

    });
};



/**
 * Update application section 2
 */
exports.update2 = function(req, res, next) {
    console.log('running update application 2');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            last_user_meeting: req.body.last_user_meeting,
            last_major_inspection: req.body.last_major_inspection,
            pms_consultants: req.body.pms_consultants,
            digitalmap_format: req.body.digitalmap_format,
            linked_basemap: req.body.linked_basemap
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};

/**
 * Update application section 3a
 */
exports.update3a = function(req, res, next) {
    console.log('running update application 3a');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    console.log(req.body);
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            network_centerlinemiles: req.body.network_centerlinemiles,
            network_totalpercentage: req.body.network_totalpercentage,
            network_milesforsurvey: req.body.network_milesforsurvey,
            network_milesremaining: req.body.network_milesremaining,
            network_additionalfunds: req.body.network_additionalfunds,
            network_percentadditionalfunds: req.body.network_percentadditionalfunds,
            arterials: req.body.arterials,
            collectors: req.body.collectors,
            residentials: req.body.residentials,
            other: req.body.other,
            other_description: req.body.other_description,
            option1: 'yes'
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};

/**
 * Update application section 3b
 */
exports.update3b = function(req, res, next) {
    console.log('running update application 3b');
    console.log(req.body);
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            option2_projectdescription: req.body.option2_projectdescription,
            option2_estimatedcost: req.body.option2_estimatedcost,
            option2_additionalfunds: req.body.option2_additionalfunds,
            signs: req.body.signs,
            stormdrains: req.body.stormdrains,
            curbs: req.body.curbs,
            gutters: req.body.gutters,
            sidewalks: req.body.sidewalks,
            trafficsignals: req.body.trafficsignals,
            streetlights: req.body.streetlights,
            otherasset: req.body.otherasset,
            option2_otherassetdescription: req.body.option2_otherassetdescription,
            option2: 'yes'
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};

/**
 * Update application section 3c
 */
exports.update3c = function(req, res, next) {
    console.log('running update application');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    console.log(req.body);
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            option3_projectdescription: req.body.option3_projectdescription,
            option3_anticipatedconstructiondate: req.body.option3_anticipatedconstructiondate,
            option3_estimatedcost: req.body.option3_estimatedcost,
            option3_additionalfunds: req.body.option3_additionalfunds,
            option3_federalaideligible: req.body.option3_federalaideligible,
            option3_constructionfullyfunded: req.body.option3_constructionfullyfunded,
            option3: 'yes'
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};

/**
 * Update application section 4
 */
exports.update4 = function(req, res, next) {
    console.log('running update application');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    console.log(req.body);
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            pms_grantamount: req.body.pms_grantamount,
            pms_localcontribution: req.body.pms_localcontribution,
            pms_additionalfunds: req.body.pms_additionalfunds,
            pms_totalprojectcost: req.body.pms_totalprojectcost,
            npt_grantamount: req.body.npt_grantamount,
            npt_totalprojectcost: req.body.npt_totalprojectcost,
            npt_additionalfunds: req.body.npt_additionalfunds,
            npt_localcontribution: req.body.npt_localcontribution,
            pdc_grantamount: req.body.pdc_grantamount,
            pdc_totalprojectcost: req.body.pdc_totalprojectcost,
            pdc_additionalfunds: req.body.pdc_additionalfunds,
            pdc_localcontribution: req.body.pdc_localcontribution
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};

/**
 * Update application section 5
 */
exports.update5 = function(req, res, next) {
    console.log('running update application');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    console.log(req.body);
    var publicworksdirector_contactnumber = req.body.publicworksdirector_contactnumber;
    var publicworksdirector_fullname = req.body.publicworksdirector_fullname;
    var publicworksdirector_title = req.body.publicworksdirector_title;
    var applicationdate = new Date();

    var emailConfirmation = req.body.emailconfirmation;
    Application.findOneAndUpdate({
        uuid: id
    }, {
        $set: {
            publicworksdirector_fullname: req.body.publicworksdirector_fullname,
            publicworksdirector_title: req.body.publicworksdirector_title,
            publicworksdirector_contactnumber: req.body.publicworksdirector_contactnumber,
            applicationdate: new Date()
        }
    }, {
        upsert: true
    }, function(err, application) {
        if (err) return handleError(err);

        Application.find({
            uuid: id
        }, function(err, application) {
            if (err) return res.send(500, err);

        });
        console.log(application);
        //Send Confirmation email if user has selected option
        var email = new sendgrid.Email();
        email.addTo(application.primary_email);
        email.subject = "P-TAP Application";
        email.setFrom('chohorst@mtc.ca.gov');
        email.setFromName('Christina Hohorst');
        email.replyto = "mziyam@mtc.ca.gov";
        // email.html = 'Thank you for submitting your application. Please save this email or print a copy for your records!<br><br> If you have any questions of concerns, please contact Christina Hohorst at chohorst@mtc.ca.gov';

        // add filter settings one at a time
        email.addFilter('templates', 'enable', 1);
        email.addFilter('templates', 'template_id', '2e7ce831-0891-47d8-bbd8-c63cf0e90755');

        email.setSubstitutions({
            primary_title: [application.primary_title],
            primary_firstname: [application.primary_firstname],
            primary_lastname: [application.primary_lastname],
            primary_jurisdiction: [application.jurisdcition],
            street_address: [application.street_address],
            street_address2: [application.street_address2],
            primary_city: [application.city],
            primary_zip: [application.zip],
            primary_position: [application.primary_position],
            primary_phone: [application.primary_phone],
            primary_email: [application.primary_email],
            streetsaver_title: [application.streetsaver_title],
            streetsaver_firstname: [application.streetsaver_firstname],
            streetsaver_lastname: [application.streetsaver_lastname],
            streetsaver_position: [application.streetsaver_position],
            streetsaver_phone: [application.streetsaver_phone],
            streetsaver_email: [application.streetsaver_email],
            attended_training: [application.attended_training],
            last_user_meeting: [application.last_user_meeting],
            last_major_inspection: [application.last_major_inspection],
            pms_consultants: [application.pms_consultants],
            digitalmap_format: [application.digitalmap_format],
            linked_basemap: [application.linked_basemap],
            network_centerlinemiles: [application.network_centerlinemiles],
            network_totalpercentage: [application.network_totalpercentage],
            network_milesforsurvey: [application.network_milesforsurvey],
            network_milesremaining: [application.network_milesremaining],
            network_additionalfunds: [application.network_additionalfunds],
            network_percentadditionalfunds: [application.network_percentadditionalfunds],
            arterials_check: [application.arterials],
            collectors_check: [application.collectors],
            residentials_check: [application.residentials],
            othertype: [application.othertype],
            other_description: [application.other_description],
            option2_projectdescription: [application.option2_projectdescription],
            option2_estimatedcost: [application.option2_estimatedcost],
            option2_additionalfunds: [application.option2_additionalfunds],
            option2_otherassetdescription: [application.option2_otherassetdescription],
            option3_projectdescription: [application.option3_projectdescription],
            option3_anticipatedconstructiondate: [application.option3_anticipatedconstructiondate],
            option3_estimatedcost: [application.option3_estimatedcost],
            option3_additionalfunds: [application.option3_additionalfunds],
            option3_federalaideligible: [application.option3_federalaideligible],
            option3_constructionfullyfunded: [application.option3_constructionfullyfunded],
            signs: [application.signs],
            stormdrains: [application.stormdrains],
            curbs: [application.curbs],
            gutters: [application.gutters],
            sidewalks: [application.sidewalks],
            trafficsignals: [application.trafficsignals],
            streetlights: [application.streetlights],
            otherasset: [application.otherasset],
            pms_grantamount: [application.pms_grantamount],
            pms_localcontribution: [application.pms_localcontribution],
            pms_additionalfunds: [application.pms_additionalfunds],
            pms_totalprojectcost: [application.pms_totalprojectcost],
            npt_totalprojectcost: [application.npt_totalprojectcost],
            npt_estimatedcost: [application.npt_estimatedcost],
            npt_additionalfunds: [application.npt_additionalfunds],
            npt_localcontribution: [application.npt_localcontribution],
            npt_grantamount: [application.npt_grantamount],
            pdc_totalprojectcost: [application.pdc_totalprojectcost],
            pdc_estimatedcost: [application.pdc_estimatedcost],
            pdc_grantamount: [application.pdc_grantamount],
            pdc_additionalfunds: [application.pdc_additionalfunds],
            pdc_localcontribution: [application.pdc_localcontribution],
            publicworksdirector_fullname: [publicworksdirector_fullname],
            publicworksdirector_title: [publicworksdirector_title],
            publicworksdirector_contactnumber: [publicworksdirector_contactnumber],
            applicationdate: [applicationdate]

        });

        console.log('about to send email');

        sendgrid.send(email, function(err, json) {
            if (err) {
                return console.error(err);
            }
            console.log(json);
        });
        res.json(application);

    });


};

/**
 * Delete a application
 */
exports.destroy = function(req, res, next) {
    console.log('running delete application');
    var id = req.params.id; //format is localhost:3000/api/application/remove/xxxx-xxxx-xxxxx
    Application.findByIdAndRemove({
        uuid: id
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });
};

/**
 * Download list of applications
 */
exports.download = function(req, res) {

    Application.find({}, function(err, applications) {
        if (err) return res.send(500, err);
        var test = JSON.stringify(applications);
        var xls = json2xls(JSON.parse(test));
        var currentDate = new Date();
        var file = 'data_' + currentDate.getHours() + '_' + currentDate.getMinutes() + '_' + currentDate.getSeconds() + '.xlsx';
        fs.writeFileSync(path.join(__dirname, '../../public') + '/downloads/' + file, xls, 'binary');
        res.json(200, applications);
    });
};



function handleError(res, err) {
    return res.send(500, err);
}
