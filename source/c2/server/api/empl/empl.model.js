'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmplSchema = new Schema({
   STATE : String,
	OCC_TITLE: String,
  TOT_EMP: Number,
  OCC_CODE: String
});

module.exports = mongoose.model('Empl', EmplSchema);
