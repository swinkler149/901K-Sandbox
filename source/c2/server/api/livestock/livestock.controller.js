'use strict';

var _ = require('lodash');
var _http = require('http');

// Get list of livestocks
exports.index = function(req, res) {
  //var sector = escape("ANIMALS & PRODUCTS");
  console.log('livestock.controller: Received: short_desc='+req.params.short_desc);

  //var shortDesc = escape("CHICKENS, (EXCL BROILERS) - INVENTORY");
  var shortDesc = escape(req.params.commodity);
  var queryString = "key=354B12E1-8F85-36E4-8053-A62ECE5757E1&short_desc="+shortDesc+"&agg_level_desc=STATE&year=2014&format=JSON";
  var host = "quickstats.nass.usda.gov";
  var cntpath = "/api/get_counts/?"+queryString;
  var qrypath = "/api/api_GET/?"+queryString;
  var http = require('http');

  // See how many recs will bbe returned
  var cntReq = http.get({host: host, path: cntpath}, function(cntResp) {
    /*console.log('STATUS: ' + cntResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(cntResp.headers));*/

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    cntResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      //console.log('BODY: ' + body);

      var jbody = JSON.parse(body);
      console.log('livestock.controller: There are %d records matching the criteria', jbody.count);
    })
  });

  // Now perform the actual query
  var qryReq = http.get({host: host, path: qrypath}, function(qryResp) {
    /*console.log('STATUS: ' + qryResp.statusCode);
    console.log('HEADERS: ' + JSON.stringify(qryResp.headers));*/

    // Buffer the body entirely for processing as a whole.
    var bodyChunks = [];
    qryResp.on('data', function(chunk) {
      // You can process streamed parts here...
      bodyChunks.push(chunk);
    }).on('end', function() {
      var livestockData = Buffer.concat(bodyChunks);
      //console.log('BODY: ' + body);
      // ...and/or process the entire body here.
      //console.log("retrieved data: " + livestockData);
      return res.json(200, livestockData);
    })
  });

/*  console.log('livestock.controller: There are %d records matching the criteria', data);
        console.log('retrieved data: ' + livestockData);
        return res.json(200, livestockData);*/
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
