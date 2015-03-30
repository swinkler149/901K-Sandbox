'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CropprodSchema = new Schema({
  Program: String,
  Year: Number,
  Period: String,
  "Week Ending": String,
  "Geo Level": String,
  State: String,
  "State ANSI": Number,
  "Ag District": String,
  "Ag District Code": String,
  County: String,
  "County ANSI": String,
  "Zip Code": String,
  Region: String,
  watershed_code: Number,
  Watershed: String,
  Commodity: String,
  "Data Item": String,
  Domain: String,
  "Domain Category": String,
  Value: Number,
  "CV (%)": String
});

module.exports = mongoose.model('Cropprod', CropprodSchema);
