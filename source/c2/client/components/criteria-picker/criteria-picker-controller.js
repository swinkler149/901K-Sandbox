'use strict';

angular.module('c2App')
  .controller('CriteriaPickerCtrl', function ($scope, $location, $http, socket) {
    // Call server APIs to populate collections
    $scope.agriculturalClassData = [];
    $http.get('/api/cropharvests/distinct/Commodity').success(function(agriculturalClassData) {
      $scope.agriculturalClassData = agriculturalClassData;
    });
    
    //fill these up with data from server
    $scope.employmentTypeData = [];
    $http.get('/api/empl/distinct/OCC_TITLE').success(function(employmentTypeData) {
      $scope.employmentTypeData = employmentTypeData;
    });
  });
  
  
