/*jslint node: true */

'use strict';
var express = require('express');
var controller = require('./application.controller');
var config = require('../../config/environment');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.get('/remove/:id', controller.destroy);
router.get('/download', controller.download);

module.exports = router;