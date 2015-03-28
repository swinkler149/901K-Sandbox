'use strict';

/**
 * @ngdoc function
 * @name c3App.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the c2App/map component
 */
angular.module('c2App')
  .controller('MapCtrl', function ($scope, $http, socket) {
    $scope.cropData = [];
    
    // Call server APIs to populate collections
    $scope.loadData = function(cropType) {
      console.log('It\'s Amazing! You provided: ', cropType);
      $http.get('/api/cropharvests/'+cropType).success(function(cropData) {
        console.log('Got back this:\n', cropData);
        $scope.cropData = cropData;
        //document.getElementById("data").innerHTML=cropData;
      });
    }
  });
