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
    // This is done directly in criteria-picker controller now
    console.log("Shouldn't need cropdata here...");
    /*$scope.cropData = [];

    $http.get('/api/cropprods').success(function(cropData) {
      $scope.cropData = cropData;
    });*/
  });
