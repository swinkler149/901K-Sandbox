'use strict';

var _ = require('lodash');
var Cropprod = require('./cropprod.model');

// Get list of cropprod
exports.index = function(req, res) {
  // find each crop record with the given parameters, selecting the identified columns
  Cropprod.count({}, function (err, count) {
    if (err) return handleError(err);
    console.log('there are %d records', count);
  });

  //Cropprod.find({ "State" : "FLORIDA" }, 'Year State Commodity', function (err, cropprods) {
  Cropprod.distinct( 'Commodity', null, function (err, cropprods) {
    if (err) return handleError(err);
    // Continue if there are no errors...
    //assert(Array.isArray(cropprods));
    console.log('Retrieved some records:\n', cropprods);
    return res.json(200, cropprods);
  });

  /*cropprod.find(function (err, cropprod) {
    if(err) { return handleError(res, err); }
    return res.json(200, cropprod);
  });*/
};

function handleError(res, err) {
  return res.send(500, err);
}
