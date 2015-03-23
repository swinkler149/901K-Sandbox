'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('c2App'));
  beforeEach(module('socketMock'));

  var MapCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    /*$httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    */
    scope = $rootScope.$new();
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

  /*it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });*/
  it('should have a name set to ed', function() {
    $httpBackend.flush();
    expect(scope.name.value)toBe('Ed');
  });
});
