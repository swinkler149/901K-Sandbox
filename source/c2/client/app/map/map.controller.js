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
      //geojson.resetStyle();
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
            function(element, index) { return (element.State.toUpperCase() === selState.toUpperCase()); });
        val += result[0].Value;
        /*for(var i = 0; i < $scope.cropData.length; i++) {
          if(featureCollection.features[0].properties.STATE_NAME.toUpperCase() === $scope.cropData[i].State.toUpperCase()) {
            val += $scope.cropData[i].Value;
            break;
          }
        }*/
        var val2 = 0;
        result = $.grep($scope.emplData,
            function(element, index) { return (element.STATE.toUpperCase() === selState.toUpperCase()); });
        val2 += result[0].TOT_EMP;
        /*for(var i = 0; i < $scope.emplData.length; i++) {
          if(featureCollection.features[0].properties.STATE_NAME.toUpperCase() === $scope.emplData[i].STATE.toUpperCase()) {
            val2 += $scope.emplData[i].TOT_EMP;
            break;
          }
        }*/
        console.log('map.controller: For ' + selState + ', found cropData.Value=' + val + ', emplData.TOT_EMP=' + val2); // Debug output
        
        // Incorporate values into Pane text
        if(val > 0)
          pane.innerHTML += "<br>" + $("#agr-picker").val() + ": " + numberWithCommas(val) + " acres harvested";
        else
          pane.innerHTML += "<br>" + $("#agr-picker").val() + ": 0";
        if(val2 > 0)
          pane.innerHTML += "<br>" + $("#empl-picker").val() + ": " + numberWithCommas(val2);
        else
          pane.innerHTML += "<br>" + $("#empl-picker").val() + ": 0";
      });
    }
    
    $scope.correlate = function() {
      //using criteria picker inputs
      //get data
      //perform correlations on data
      //present results
	  
      var cropType = $('#agr-picker').val();
      $http.get('/api/cropharvests/'+cropType).success(function(cropData) {
        $scope.cropData = cropData;			
        $scope.processor(cropData);
      });
		
      var emplType = $('#empl-picker').val();
      $http.get('/api/empl/'+emplType).success(function(emplData) {
        $scope.emplData = emplData;
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
      console.log('map.controller: Count is: ' + cropData.length);
	
      var stateValues = [];
      for(var i = 0; i < cropData.length; i++) {
        if(stateValues[cropData[i].State] === undefined)
          stateValues[cropData[i].State] = 0;
        stateValues[cropData[i].State] += cropData[i].Value;
      }
      console.log('map.controller: stateValues=' + stateValues);
	
      // If we use colorbrewer, we don't need to calculate this...
      /*var maxCropDataValue = 0;
      for(var i = 0; i < cropData.length; i++) {
        //maxCropDataValue = maxCropDataValue > cropData[i].Value ? maxCropDataValue : cropData[i].Value;
        if(stateValues[cropData[i].State] > maxCropDataValue) {
          maxCropDataValue = stateValues[cropData[i].State];
          console.log('map.controller: ' + maxCropDataValue + ' :: ' + cropData[i].State);
        }
      }
      console.log('map.controller: maxCropDataValue=' + maxCropDataValue);*/
	
      for (var i = cropData.length - 1; i >= 0; i--) {
        var curState = cropData[i].State;
        var curStateValue = stateValues[cropData[i].State];
        console.log('map.controller: ' + curState + ' -- ' + curStateValue);

        // Augment existing State feature with info. needed for "heatmap"
        //var geojson;
        $scope.cropLayerGroup.clearLayers(); // "Resets" the map before displaying new crop data		
        states.find()
          .layers('2')
          .text(curState)
          .run(function(error, featureCollection) {
            for(var i = 0; i < featureCollection.features.length; i++) {
              //console.log(featureCollection.features[i].properties.STATE_NAME)
              for(var j = 0; j < cropData.length; j++) {
                if(featureCollection.features[i].properties.STATE_NAME.toUpperCase() === cropData[j].State.toUpperCase()) {
                  stateValues = [];
                  for(var k = 0; k < cropData.length; k++) {
                    if(stateValues[cropData[k].State] === undefined) 
                      stateValues[cropData[k].State] = 0;
                    stateValues[cropData[k].State] += cropData[k].Value;
                  }
                  curStateValue = stateValues[cropData[j].State];

                  // Add the layers to the cropLayerGroup, so they can be controlled as a unit
                  $scope.cropLayerGroup.addLayer(new L.GeoJSON(featureCollection.features[i], {
                      style: style(curStateValue, 0), //maxCropDataValue
                      onEachFeature: $scope.onEachFeature
                  }));
                }
              }
            }
            //console.log('map.html: GeoJSON ' + geojson.type + ' (before augmentation):\n', geojson);
          });
        // Add the assembled LayerGroup to the map all at once
        $scope.cropLayerGroup.addTo(map);
      }
    }
  });
