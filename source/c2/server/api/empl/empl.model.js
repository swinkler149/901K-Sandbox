'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmplSchema = new Schema({
  EmplCd: String,
  Descr: String
});

module.exports = mongoose.model('Empl', EmplSchema);
