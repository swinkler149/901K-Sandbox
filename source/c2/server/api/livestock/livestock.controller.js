'use strict';

var _ = require('lodash');

// Get list of livestocks
exports.index = function(req, res) {
  //var sector = escape("ANIMALS & PRODUCTS");
  console.log('livestock.controller: Received: short_desc='+req.params.short_desc);

  //var shortDesc = escape("CHICKENS, (EXCL BROILERS) - INVENTORY");
  var shortDesc = escape(req.params.short_desc);
  var queryString = "key=354B12E1-8F85-36E4-8053-A62ECE5757E1&short_desc="+shortDesc+"&agg_level_desc=STATE&year=2014&format=JSON";
  var fullCountURI = "http://quickstats.nass.usda.gov/api/get_counts/?"+queryString;
  var fullQueryURI = "http://quickstats.nass.usda.gov/api/api_GET/?"+queryString;
  jQuery.ajax({
      url: fullCountURI,
      type: "GET",
      //data: JSON.stringify({"foo":"bar"}),
      //dataType: "json",
      //contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log("success");
        console.log('livestock.controller: There are %d records matching the criteria', response.body);
        return response.body;
      },
      error: function (response) {
        console.log("failed");
      }
  });

  jQuery.ajax({
      url: fullQueryURI,
      type: "GET",
      //data: JSON.stringify({"foo":"bar"}),
      //dataType: "json",
      //contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log("success");
        return json(200, response.body);
      },
      error: function (response) {
        console.log("failed");
      }
  });  

  /*$http.get(fullQueryURI).success(function(livestockData) {

        console.log('retrieved data: ' + livestockData);
        return res.json(200, livestockData);
      });*/

  /*Livestock.find(function (err, livestocks) {
    if(err) { return handleError(res, err); }
    return res.json(200, livestocks);
  });*/
};

// Get list of distinct Commodity values
exports.distinct = function(req, res) {
  console.log('livestock.controller: Received: field='+req.params.field);
  
  return res.json(200, [ "CHICKENS, (EXCL BROILERS) - INVENTORY" ]);
  /*Empl.distinct( req.params.field, null, function (err, distinctEmpls) {
    if (err) return handleError(err);
    // Continue if there are no errors...
    return res.json(200, distinctEmpls);
  });*/
};

function handleError(res, err) {
  return res.send(500, err);
}
