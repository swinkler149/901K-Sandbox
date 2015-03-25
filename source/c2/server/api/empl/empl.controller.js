'use strict';

var _ = require('lodash');
var Empl = require('./empl.model');

// Get list of empls
exports.index = function(req, res) {
  Empl.find(function (err, emplCats) {
    if(err) { return handleError(res, err); }
    return res.json(200, emplCats);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
