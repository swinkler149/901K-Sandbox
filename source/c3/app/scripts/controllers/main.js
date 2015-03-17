'use strict';

/**
 * @ngdoc function
 * @name c3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the c3App
 */
angular.module('c3App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
