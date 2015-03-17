'use strict';

/**
 * @ngdoc function
 * @name c3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the c3App
 */
angular.module('c3App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
