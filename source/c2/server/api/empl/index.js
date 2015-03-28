'use strict';

var express = require('express');
var controller = require('./empl.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/distinct/:field', controller.distinct);
router.get('/:empl', controller.index);

module.exports = router;
