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
    
    // Call server APIs to populate collections
    $scope.loadData = function() {
		var cropType = $('#agr-picker').val();
		$http.get('/api/cropharvests/'+cropType).success(function(cropData) {
			$scope.cropData = cropData;
		});
    }

	$scope.onEachFeature = function(feature, layer) {
		layer.on({
		  mouseover: $scope.highlightFeature,
		  mouseout: $scope.resetHighlight,
		  click: $scope.updatePane
		});
	}

	$scope.highlightFeature = function(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera) {
			layer.bringToFront();
		}
	}
	
	$scope.resetHighlight = function(e) {
		var layer = e.target;

		layer.setStyle({
		  weight: 2,
		  opacity: 1,
		  color: '#000',
		  dashArray: '3',
		  fillOpacity: 0.7
		});
	}
	
	function numberWithCommas(x) {
		x = x.toString();
		var pattern = /(-?\d+)(\d{3})/;
		while (pattern.test(x))
			x = x.replace(pattern, "$1,$2");
		return x;
	}
  
	$scope.updatePane = function(e) {
		states.identify().on(map).at(e.latlng).run(function(error, featureCollection){
			pane.innerHTML = 'Selected State: <b>' + featureCollection.features[0].properties.STATE_NAME + '</b>';
			
			var val = 0;
			for(var i = 0; i < $scope.cropData.length; i++) {
					if(featureCollection.features[0].properties.STATE_NAME.toUpperCase() === $scope.cropData[i].State.toUpperCase()) {
						val += $scope.cropData[i].Value;
					}				
			}
			if(val > 0) {
				pane.innerHTML += "<br>" + $("#agr-picker").val() + ": " + numberWithCommas(val);
			}
			else {
				pane.innerHTML += "<br>" + $("#agr-picker").val() + ": 0";
			}
		});
  }
	
	
    $scope.cropData = [];
    $scope.correlate = function() {
      //using criteria picker inputs
      //get data
      //perform correlations on data
      //present results
		console.log('ok');
		var cropType = $('#agr-picker').val();
		$http.get('/api/cropharvests/'+cropType).success(function(cropData) {
			$scope.cropData = cropData			
			$scope.processor(cropData);
		});
    };
	
  $scope.processor = function(rawData) {
    //console.log('map.html: Raw data received:\n', rawData);
    
    // empty geojson feature collection
    var geojsonFeatureCollection = {
      type: 'FeatureCollection',
      features: []
    };

    var cropData = angular.fromJson(rawData);
    //console.log('map.html: Count is: ' + cropData.length);
	
	var maxCropDataValue = 0;
	for(var i = 0; i < cropData.length; i++) {
		maxCropDataValue = maxCropDataValue > cropData[i].Value ? maxCropDataValue : cropData[i].Value;
	}
	
    for (var i = cropData.length - 1; i >= 0; i--) {
      var curState = cropData[i].State;
	  var curStateValue = cropData[i].Value;
      //console.log('map.html: Processing for ' + curState);      

      // Augment existing State feature with info. needed for "heatmap"
      var geojson;
		
      states.find()
        .layers('2')
        .text(curState)
        .run(function(error, featureCollection) {
		  
			for(var i = 0; i < featureCollection.features.length; i++) {
				//console.log(featureCollection.features[i].properties.STATE_NAME)
				for(var j = 0; j < cropData.length; j++) {
					if(featureCollection.features[i].properties.STATE_NAME.toUpperCase() === cropData[j].State.toUpperCase()) {
						var df = new L.GeoJSON(featureCollection.features[i], {
							style: style(cropData[j].Value, maxCropDataValue),
							onEachFeature: $scope.onEachFeature
						}).addTo(map);
					}
				}
			}
		  
		  
          //console.log('map.html: GeoJSON ' + geojson.type + ' (before augmentation):\n', geojson);
        });

      //console.log('map.html: Injecting Value=' + cropData[i].Value);
      //geojson._layers[0].feature.properties.push({"Value" : cropData[i].Value});
      geojsonFeatureCollection.features.push(geojson);
    }
  }
  
  
  });
