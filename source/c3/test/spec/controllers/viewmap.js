'use strict';

describe('Controller: ViewmapCtrl', function () {

  // load the controller's module
  beforeEach(module('c3App'));

  var ViewmapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewmapCtrl = $controller('ViewmapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
