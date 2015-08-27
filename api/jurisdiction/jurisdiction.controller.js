/*jslint node: true */

/**
 * Using Rails-like standard naming convention for endpoints.
 * GET      /jurisdiction              ->  index
 */


'use strict';
var _ = require('lodash');
var Jurisdiction = require('./jurisdiction.model');

/**
 * Get jurisdictions with all attributes
 */
exports.index = function(req, res) {

    Jurisdiction.find({}, function(err, jurisdictions) {
        if (err) return res.send(500, err);
        res.json(200, jurisdictions);
    });
};

/**
 * Get jurisdiction names
 */
exports.name = function(req, res) {

    Jurisdiction.find({}, {
        '_id': 0,
        'Jurisdiction': 1
    }, function(err, jurisdictions) {
        if (err) return res.send(500, err);
        res.json(200, jurisdictions);
    });
};

/**
 * Get jurisdiction information
 */
exports.info = function(req, res) {
    var name = req.params.name;

    Jurisdiction.find({
        'Jurisdiction': name
    }, function(err, jurisdictions) {
        if (err) return res.send(500, err);
        res.json(200, jurisdictions);
    });
};


function handleError(res, err) {
    return res.send(500, err);
}
