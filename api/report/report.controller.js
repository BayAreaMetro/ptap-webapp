/*jslint node: true */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /report              ->  index
 * POST     /report              ->  create a report
 * GET      /report/:id          ->  show specific report
 * POST     /report/:id          ->  update
 * GET      /report/remove/:id   ->  destroy
 */


'use strict';
var _ = require('lodash');
var Report = require('./report.model');
var uuid = require('node-uuid');
var sendgrid = require('sendgrid')('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');

/**
 * Get list of reports
 */
exports.index = function(req, res) {

    Report.find({}, function(err, reports) {
        if (err) return res.send(500, err);
        res.json(200, reports);
    });
};

/**
 * Creates a new report
 */
exports.create = function(req, res, next) {
    console.log('running create report');
    var newReport = new Report(req.body);
    var emailConfirmation = req.body.emailconfirmation;
    newReport.publicworksdirector = {
        'fullname': 'Michael Ziyambi',
        'title': 'GIS Analyst',
        'contactnumber': '510-817-3210'
    };
    newReport.uuid = uuid.v1();
    newReport.save(function(err, report) {
        if (err) return console.error(err);

        if (emailConfirmation === 'yes') {
            //Send Confirmation email if user has selected option
            var email = new sendgrid.Email();
            email.addTo('mziyambi@mtc.ca.gov');
            email.subject = "Send with templates app";
            email.from = 'gfrausto@mtc.ca.gov';
            email.text = 'Hi there!';
            email.html = 'Thank you for submitting your application. Please save this email or print a copy for your records!<br><br> If you have any questions of concerns, please contact Christina Hohorst at chohorst@mtc.ca.gov';

            // add filter settings one at a time
            email.addFilter('templates', 'enable', 1);
            email.addFilter('templates', 'template_id', '2e7ce831-0891-47d8-bbd8-c63cf0e90755');

            sendgrid.send(email, function(err, json) {
                if (err) {
                    return console.error(err);
                }
                console.log(json);
            });
            res.json(report);
        } else {
            res.json(report);
        }
        //end if


    });
};

/**
 * Update a report
 */
exports.update = function(req, res, next) {
    console.log('running update report');
    var id = req.params.id; //format is localhost:3000/api/report/xxxx-xxxx-xxxxx
    console.log(id);
    Report.findByIdAndUpdate(id, {
        $set: {
            street_address: req.body.street_address
        }
    }, function(err, report) {
        if (err) return handleError(err);
        res.send(report);
    });


};


/**
 * Delete a report
 */
exports.destroy = function(req, res, next) {
    console.log('running delete report');
    var id = req.params.id; //format is localhost:3000/api/report/remove/xxxx-xxxx-xxxxx
    Report.findByIdAndRemove(id, function(err, report) {
        if (err) return handleError(err);
        res.send(report);
    });
};




function handleError(res, err) {
    return res.send(500, err);
}
