'use strict';

var _ = require('lodash');
var Cropharvest = require('./cropharvest.model');

// Get list of cropharvests
exports.index = function(req, res) {
  // find each crop record with the given parameters, selecting the identified columns
  Cropharvest.count({}, function (err, count) {
    if (err) return handleError(err);
    console.log('cropharvest.controller: There are %d records', count);
  });

  //Cropprod.find({ "State" : "FLORIDA" }, 'Year State Commodity', function (err, cropprods) {
  Cropharvest.distinct( 'Commodity', null, function (err, cropharvests) {
    if (err) return handleError(err);
    // Continue if there are no errors...
    //assert(Array.isArray(cropharvests));
    //console.log('Retrieved some records:\n', cropharvests); // Debug output
    return res.json(200, cropharvests);
  });

  /*cropharvests.find(function (err, cropharvests) {
    if(err) { return handleError(res, err); }
    return res.json(200, cropharvests);
  });*/
};

function handleError(res, err) {
  return res.send(500, err);
}
