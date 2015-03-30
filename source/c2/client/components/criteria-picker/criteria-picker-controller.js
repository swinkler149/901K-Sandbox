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
	
	//handle presentation type selectors
	$('[ng-controller="CriteriaPickerCtrl"]').find('[type="checkbox"]').change(function() {
		
		if(!$(this).is(':checked')) {
			$('[ng-controller="CriteriaPickerCtrl"]').find('[type="checkbox"]').each(function() {
				$(this).removeAttr('disabled');
			});
		}
		else {
			$('[ng-controller="CriteriaPickerCtrl"]').find('[type="checkbox"]').each(function() {
				if(!$(this).is(':checked')){
					$(this).attr('disabled','disabled');
				} 
			});
		}
	});
	
	
  });
  
  
