'use strict';

angular.module('c2App')
  .controller('CriteriaPickerCtrl', function ($scope, $location) {
    
    //fill these up with data from server
    $scope.employmentTypeData = [];
    $scope.agriculturalClassData = [];

    $scope.correlate = function() {
      //using criteria picker inputs
      //get data
      //perform correlations on data
      //present results
    };
  });
