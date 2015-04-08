'use strict';

var express = require('express');
var controller = require('./livestock.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/distinct/:field', controller.distinct);
router.get('/:empl', controller.index);

//router.get('/:id', controller.show);

module.exports = router;
