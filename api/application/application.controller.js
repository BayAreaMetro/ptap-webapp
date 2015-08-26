/*jslint node: true */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /application              ->  index
 * POST     /application              ->  create a application
 * GET      /application/:id          ->  show specific application
 * POST     /application/:id          ->  update
 * GET      /application/remove/:id   ->  destroy
 */

'use strict';
var _ = require('lodash');
var Application = require('./application.model');
var uuid = require('node-uuid');
var sendgrid = require('sendgrid')('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');

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
 * Creates a new application
 */
exports.create = function(req, res, next) {
    console.log('running create application');
    var newapplication = new Application(req.body);
    var emailConfirmation = req.body.emailconfirmation;
    newapplication.publicworksdirector = {
        'fullname': 'Michael Ziyambi',
        'title': 'GIS Analyst',
        'contactnumber': '510-817-3210'
    };
    newapplication.uuid = uuid.v1();
    newapplication.save(function(err, application) {
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
            res.json(application);
        } else {
            res.json(application);
        }
        //end if


    });
};

/**
 * Update a application
 */
exports.update = function(req, res, next) {
    console.log('running update application');
    var id = req.params.id; //format is localhost:3000/api/application/xxxx-xxxx-xxxxx
    console.log(id);
    Application.findByIdAndUpdate(id, {
        $set: {
            street_address: req.body.street_address
        }
    }, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });


};


/**
 * Delete a application
 */
exports.destroy = function(req, res, next) {
    console.log('running delete application');
    var id = req.params.id; //format is localhost:3000/api/application/remove/xxxx-xxxx-xxxxx
    Application.findByIdAndRemove(id, function(err, application) {
        if (err) return handleError(err);
        res.send(application);
    });
};




function handleError(res, err) {
    return res.send(500, err);
}
