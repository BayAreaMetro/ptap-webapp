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
    newReport.publicworksdirector = {
        'fullname': 'Michael Ziyambi',
        'title': 'GIS Analyst',
        'contactnumber': '510-817-3210'
    };
    newReport.uuid = uuid.v1();
    newReport.save(function(err, report) {
        if (err) return console.error(err);
        res.json(report);
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
