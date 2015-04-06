'use strict';

var _ = require('lodash');

// Get list of livestocks
exports.index = function(req, res) {
  //var sector = escape("ANIMALS & PRODUCTS");
  var shortDesc = escape("CHICKENS, ROOSTERS & OTHER - INVENTORY");
  var queryString = "key=354B12E1-8F85-36E4-8053-A62ECE5757E1&short_desc="+shortDesc+"&agg_level_desc=STATE&year__GE=2010&format=JSON";

  var fullQueryURI = "http://quickstats.nass.usda.gov/api/api_GET/?"+queryString;
  
  $http.get(fullQueryURI).success(function(livestockData) {

        console.log('retrieved data: ' + livestockData);
        return res.json(200, livestockData);
      });

  /*Livestock.find(function (err, livestocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, livestocks);
  });*/
};

function handleError(res, err) {
  return res.send(500, err);
}
