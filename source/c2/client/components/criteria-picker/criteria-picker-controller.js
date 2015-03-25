'use strict';

angular.module('c2App')
  .controller('CriteriaPickerCtrl', function ($scope, $location, $http, socket) {
    // Call server APIs to populate collections
    $scope.agriculturalClassData = []; //cropData = [];

    $http.get('/api/cropprods').success(function(agriculturalClassData) {
      $scope.agriculturalClassData = agriculturalClassData;
    });
    
    //fill these up with data from server
    $scope.employmentTypeData = [];
    //$scope.agriculturalClassData = cropData;//{};

    $scope.correlate = function() {
      //using criteria picker inputs
      //get data
      //perform correlations on data
      //present results
    };
  });
