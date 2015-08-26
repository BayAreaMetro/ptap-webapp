/*jslint node: true */

'use strict';
var express = require('express');
var controller = require('./jurisdiction.controller');
var config = require('../../config/environment');


var router = express.Router();

router.get('/', controller.index);
router.get('/name', controller.name);


module.exports = router;