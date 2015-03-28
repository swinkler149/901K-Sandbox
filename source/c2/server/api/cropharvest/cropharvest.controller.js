'use strict';

var _ = require('lodash');
//var __ = require('esri-leaflet');
var Cropharvest = require('./cropharvest.model');

// Get list of cropharvests
exports.index = function(req, res) {
  console.log('cropharvest.controller: Received: crop='+req.params.crop);

  // This is just for server-side debugging
  Cropharvest.count({ "Commodity" : req.params.crop, "Domain" : "TOTAL" }, function (err, count) {
    if (err) return handleError(err);
    console.log('cropharvest.controller: There are %d records matching the criteria', count);
  });

  // find each crop record with the given parameters, selecting the identified columns
  Cropharvest.find({ "Commodity" : req.params.crop, "Domain" : "TOTAL" }, 'Year State Commodity "Data Item" Value', function (err, cropharvests) {
    if(err) { return handleError(res, err); }
    return res.json(200, cropharvests);
  });
};

// Get list of distinct Commodity values
exports.distinct = function(req, res) {
  console.log('cropharvest.controller: Received: field='+req.params.field);
  Cropharvest.distinct( req.params.field, null, function (err, distinctCrops) {
    if (err) return handleError(err);
    // Continue if there are no errors...
    return res.json(200, distinctCrops);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
