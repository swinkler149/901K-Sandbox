'use strict';

var _ = require('lodash');
var Empl = require('./empl.model');

// Get list of empls
exports.index = function(req, res) {
  console.log('empl.controller: Received: empl='+req.params.empl);
  Empl.count({ "OCC_TITLE" : req.params.empl }, function (err, count) {
    if (err) return handleError(err);
    console.log('empl.controller: There are %d records matching the criteria', count);
  });
  
  // find each empl record with the given parameters, selecting the identified columns
  Empl.find({ "OCC_TITLE" : req.params.empl }, 'STATE OCC_TITLE TOT_EMP', function (err, empls) {
    if(err) { return handleError(res, err); }
    return res.json(200, empls);
  });
};

// Get list of distinct Commodity values
exports.distinct = function(req, res) {
  console.log('empl.controller: Received: field='+req.params.field);
  Empl.distinct( req.params.field, null, function (err, distinctEmpls) {
    if (err) return handleError(err);
    // Continue if there are no errors...
    return res.json(200, distinctEmpls);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
