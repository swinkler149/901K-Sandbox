'use strict';

var express = require('express');
var controller = require('./cropharvest.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/distinct/:field', controller.distinct);
router.get('/:crop', controller.index);

module.exports = router;
