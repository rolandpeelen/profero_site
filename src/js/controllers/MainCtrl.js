'use strict';

angular.module('proferoSite').controller('MainCtrl', ['$scope', 'PROJECTCONSTANT', '$rootScope', function ($scope, PROJECTCONSTANT, $rootScope) {
  $scope.projects = PROJECTCONSTANT;
  $scope.activeProject = PROJECTCONSTANT[1];
  var projectDrawerActive = false;

  $scope.openProject = function(project){
    $scope.activeProject = project;
    $rootScope.noScrolling = true;
    projectDrawerActive = true;
  };

  $scope.closeProject = function(){
    projectDrawerActive = false;
    $rootScope.noScrolling = false;
  };

  $scope.isProjectDrawerActive = function(){
    return projectDrawerActive;
  };

  function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
      mapTypeId: 'roadmap',
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
    map.scrolling = false;

    // Multiple Markers
    var markers = [
      ['Profero Wijchen', 51.7971769,5.7232304],
      ['Profero Amsterdam', 52.3597684,4.891746]
    ];

    // Info Window Content
    var infoWindowContent = [
      ['<div class="info_content">' +
      '<h4>Profero Wijchen</h4>' +
      '</div>'],
      ['<div class="info_content">' +
      '<h4>Profero Amsterdam</h4>' +
      '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
      });

      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infoWindow.setContent(infoWindowContent[i][0]);
          infoWindow.open(map, marker);
        }
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(8);
      google.maps.event.removeListener(boundsListener);
    });
  }
  initialize();
}]);
