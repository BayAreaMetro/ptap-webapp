'use strict';
//console.log('loading reports');
var express = require('express');
var controller = require('./report.controller');
var config = require('../../config/environment');


var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);


module.exports = router;