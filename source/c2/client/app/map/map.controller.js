'use strict';

/**
 * @ngdoc function
 * @name c2App.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the c2App/map component
 */
angular.module('c2App')
  .controller('MapCtrl', function ($scope, $http, socket) {
    // Initialize scope collections    
    $scope.cropData = [];
    $scope.emplData = [];
    $scope.cropLayerGroup = new L.LayerGroup();
	
	
	  // Initialize some variables...
	  var map;
	  var states;
	  var pane;
	  var identifiedFeature;
	  // Functions for interacting with the map
	  function zoomToFeature(e) {
		console.log('map.html: ok');
		map.fitBounds(e.target.getBounds());
	  }

	  // For assigning colors based on crop harvest
	  // Generated by colorbrewer2.org
	  function getColor(d) {
		return d > 250000  ? '#004529' :
			   d > 100000  ? '#006837' :
			   d > 50000   ? '#238443' :
			   d > 25000   ? '#41AB5D' :
			   d > 10000   ? '#78C679' :
			   d > 5000    ? '#ADDD8E' :
			   d > 1000    ? '#D9F0A3' :
			   d > 100     ? '#F7FCB9' :
							 '#FFFFE5';
	  }
	  function componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	  }

	  function rgbToHex(r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	  }
		
	  function getStateColor(d, max) {	
		var c = Math.floor(255 - (d / max * 255));
		c = Math.min(c,255);
		c = Math.max(c,0);
			
		if(isNaN(c)) return rgbToHex(255,255,255);		
		  return rgbToHex(255,c,c);
	  }

	  function style(stateValue, max) {
		return {
		  fillColor: getColor(stateValue), //getStateColor(stateValue, max),
		  weight: 2,
		  opacity: 1,
		  color: '#000000',
		  dashArray: '4',
		  fillOpacity: 0.5
		};
	  }

	  // Workaround...
	  var setint = setInterval(function() {
		if(typeof require != undefined) {
		  clearInterval(setint);
		  // Initialize the map
		  map = L.map('map').setView([37.78, -92.85], 4); // All of US

		  L.esri.basemapLayer('Gray').addTo(map);
		  states = L.esri.dynamicMapLayer('http://sampleserver5.arcgisonline.com/arcgis/rest/services/USA/MapServer', {
			  layers: [2],
			  opacity: 0.5,
			  useCors: false
		  }).addTo(map);

		  // Include handy Geosearch control
		  var searchControl = new L.esri.Geocoding.Controls.Geosearch().addTo(map);
		  var results = new L.LayerGroup().addTo(map);
		  searchControl.on('results', function(data){
			results.clearLayers();
			for (var i = data.results.length - 1; i >= 0; i--) {
			  results.addLayer(L.marker(data.results[i].latlng));
			}
		  });

		  // Pane for showing relevant data
		  var info = L.control({position: 'topright'});
		  info.onAdd = function (map) {
			pane = L.DomUtil.create('div', 'info'); // create a div with a class "info"
			pane.innerHTML += 'No State Selected'; // Initial text
			return pane;
		  };
		  info.addTo(map);

		  // Include static Legend
		  var legend = L.control({position: 'bottomright'});
		  legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 100, 1000, 5000, 10000, 25000, 50000, 100000, 250000],
				labels = [];

			// loop through our density intervals and generate a label with a colored square for each interval
			for (var i = 0; i < grades.length; i++) {
			  div.innerHTML +=
				  '<i style="background:' + getColor(grades[i] + 1, 0) + '"></i> ' +
				  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			}  
			return div;
		  };
		  legend.addTo(map);
		  
		  console.log('map.html: Successfully loaded map!');    
		}
	  }, 500);

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
          weight: 4,
          color: '#666666',
          dashArray: '',
          fillOpacity: 0.5
      });

      if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
      }

      // Update pane here, if we want to change pane contents on hover
      $scope.updatePane(e);
    }
	
    $scope.resetHighlight = function(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 2,
          opacity: 1,
          color: '#000000',
          dashArray: '4',
          fillOpacity: 0.5
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
        var selState = featureCollection.features[0].properties.STATE_NAME; // just to simplify future references

        pane.innerHTML = 'Selected State: <b>' + selState + '</b>';
	
        var val = 0;
        var result = $.grep($scope.cropData, 
            function(element, index) {
				if(element.State.toUpperCase() === selState.toUpperCase()) {
					val += element.Value; 
				}
				return (element.State.toUpperCase() === selState.toUpperCase()); 
			});
		if(val > 0)
		  pane.innerHTML += "<br>" + $("#agr-picker").val() + ": " + numberWithCommas(val) + " acres harvested";
		
        val = 0;
        result = $.grep($scope.emplData,
            function(element, index) {
				if(element.STATE.toUpperCase() === selState.toUpperCase()) {
					val += element.TOT_EMP; 
				}
				return (element.STATE.toUpperCase() === selState.toUpperCase()); 
			});
        if(val > 0)
          pane.innerHTML += "<br>" + $("#empl-picker").val() + ": " + numberWithCommas(val);
	  
      });
    }
    
    $scope.correlate = function() {
	  
      var cropType = $('#agr-picker').val();
      $http.get('/api/cropharvests/'+cropType).success(function(cropData) {
        $scope.cropData = cropData;		
		if($('.agr-panel').find('input[type="checkbox"]').is(':checked'))
			$scope.processor(cropData, "State", "Value");
      });
		
      var emplType = $('#empl-picker').val();
      $http.get('/api/empl/'+emplType).success(function(emplData) {
        $scope.emplData = emplData;		
		if($('.empl-panel').find('input[type="checkbox"]').is(':checked'))
			$scope.processor(emplData, "STATE", "TOT_EMP");
      });
    };
	
    $scope.processor = function(rawData, input, output) {
      var geojsonFeatureCollection = {
          type: 'FeatureCollection',
          features: []
      };

      var data = angular.fromJson(rawData);
      console.log('map.controller: Count is: ' + data.length);
	
      var stateValues = [];
      for(var i = 0; i < data.length; i++) {
        if(stateValues[data[i][input]] === undefined)
          stateValues[data[i][input]] = 0;
        stateValues[data[i][input]] += data[i][output];
      }
      console.log('map.controller: stateValues=' + stateValues);
	
      for (var i = data.length - 1; i >= 0; i--) {
        var curState = data[i][input];
        var curStateValue = stateValues[data[i][input]];
        console.log('map.controller: ' + curState + ' -- ' + curStateValue);

        // Augment existing State feature with info. needed for "heatmap"
        $scope.cropLayerGroup.clearLayers(); // "Resets" the map before displaying new crop data		
        states.find()
          .layers('2')
          .text(curState)
          .run(function(error, featureCollection) {
            for(var i = 0; i < featureCollection.features.length; i++) {
              for(var j = 0; j < data.length; j++) {
                if(featureCollection.features[i].properties.STATE_NAME.toUpperCase() === data[j][input].toUpperCase()) {
                  stateValues = [];
                  for(var k = 0; k < data.length; k++) {
                    if(stateValues[data[k][input]] === undefined) 
                      stateValues[data[k][input]] = 0;
                    stateValues[data[k][input]] += data[k][output];
                  }
                  curStateValue = stateValues[data[j][input]];

                  // Add the layers to the cropLayerGroup, so they can be controlled as a unit
                  $scope.cropLayerGroup.addLayer(new L.GeoJSON(featureCollection.features[i], {
                      style: style(curStateValue, 0), //maxCropDataValue
                      onEachFeature: $scope.onEachFeature
                  }));
                }
              }
            }
          });
        // Add the assembled LayerGroup to the map all at once
        $scope.cropLayerGroup.addTo(map);
      }
    }
  });
