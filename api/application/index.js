/*jslint node: true */

'use strict';
var express = require('express');
var controller = require('./application.controller');
var config = require('../../config/environment');

var router = express.Router();

router.get('/', controller.index);
router.post('/:id', controller.create);
router.post('/update2/:id', controller.update2);
router.post('/update3a/:id', controller.update3a);
router.post('/update3b/:id', controller.update3b);
router.post('/update3c/:id', controller.update3c);
router.post('/update4/:id', controller.update4);
router.post('/update5/:id', controller.update5);
router.get('/remove/:id', controller.destroy);
router.get('/download', controller.download);

module.exports = router;