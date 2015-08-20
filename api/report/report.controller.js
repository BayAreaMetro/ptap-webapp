'use strict';
//console.log('loading controller');
var _ = require('lodash');
var Report = require('./report.model');
//var config = require('../../config/environment');


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {

    Report.find({}, function(err, reports) {
        if (err) return res.send(500, err);
        res.json(200, reports);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
	console.log(req.body.street_name);
	console.log('running insert');
    var newReport = new Report(req.body);
    console.log(newReport);

    newReport.save(function(err, report) {
        if (err) return console.error(err);
        res.json(report);
    });
};



function handleError(res, err) {
    return res.send(500, err);
}
