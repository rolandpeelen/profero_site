'use strict';

angular.module('proferoSite', [
  'ui.router',
  'cgBusy'
]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
      .state('home', {
        url: '/home',
        views: {
          'MainView': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }
      });
}).value('cgBusyDefaults',
    {
      message: 'Laden...',
      backdrop: 'true',
      templateUrl: 'views/angular-busy.html'

    }).run(function () {
      //Attach Fastclick to body
      FastClick.attach(document.body);

      //Add noTouch class for mobile
      if (!('ontouchstart' in document.documentElement)) {
        document.documentElement.className += 'no-touch';
      }

    });
'use strict';

angular.module('proferoSite')
    .constant('PROJECTCONSTANT', {
      1: {
        name: 'LIPS',
        descriptionSmall: 'Landelijke Inventarisatie Politie Systemen. A software license management system at the Dutch Police.',
        descriptionLarge: 'In assignment of the Dutch Police we are constantly developing and maintaining the LIPS system. Ever since 2006 the Dutch Police has been using LIPS to consolidate and optimize their wide variety of software packages nation wide. ' +
        'The Netherlands has as many as 26 distinct Police departments that used to select and license sofware packages autonomously from one another. Using LIPS, license management is now centralized and the Police\'s software wheelpark is getting more efficient every year.' ,
        tagline: 'Building durable and scalable software',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/politie.jpg',
        link: ''
      },
      2: {
        name: 'SlimFitted',
        descriptionSmall: 'An online dress shirt product configurator, enabling clients to compose their next tailored shirt.',
        descriptionLarge: 'In 2014 we teamed up with the people at SlimFitted to work on a revolutionary new product configurator. Instead of using costly photographs to ' +
        'show customers a shirt configuration, this configurator uses photorealistic 3d visualisations based on a 3d computer model. Using 3d renders over old-fashioned photographs enables Slimfitted to alter shirt configurations by changing the underlying 3d model and redoing some of the renders, instead of redoing expensive photoshoots.',
        tagline: 'Developing the next generation of online apps',
        partners: 'Peppr',
        categories: 'Software, Design',
        image: 'dist/assets/img/slimFitted.jpg',
        link: 'http://slimfitted.com/designer'
      },
      3: {
        name: 'Bachkoor Booking',
        descriptionSmall: 'A realtime booking system showing you the real availability of seats.',
        descriptionLarge: 'In 2015 \'Bachkoor Nijmegen\' asked us to build their new website to support a more youthful image. We not only helped them with their website,' +
        'but also took the opportunity to build them a next generation realtime seat booking app. Contrary to other booking apps, this one works in realtime. If one user clicks a chair, it\'s immediately ' +
        'blocked out in all other users\'s web browsers. No more constantly reloading the page!',
        tagline: 'Working with cutting edge realtime technology',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/bachkoorBooking.jpg',
        link: 'http://rolandpeelen.com/devcenter/bachkoor_booking'
      },
      4: {
        name: 'Gemeente Utrecht',
        descriptionSmall: 'Managing a software implementation project for the municipality of Utrecht.',
        descriptionLarge: 'The municipality of Utrecht asked us to manage the technical and functional implementation of a publication system on their public website. ' +
        'The system consists of three modules (Babs, BabsOnline and iBabs), externally hosted and supplied by Cap Gemini / MSI. The project required intensive team work between business and technical project managers, the supplier (Cap / MSI), key users, technical specialists and functional managers. We made ' +
        'sure the project went according to plan.',
        tagline: 'Partner in Interim Management',
        partners: '',
        categories: 'Software, Project Management',
        image: 'dist/assets/img/utrecht.jpg',
        link: 'http://utrecht.nl'
      }
    });
'use strict';

angular.module('proferoSite').controller('MainCtrl', ['$scope', 'PROJECTCONSTANT', '$rootScope', function ($scope, PROJECTCONSTANT, $rootScope) {
  $scope.projects = PROJECTCONSTANT;
  $scope.activeProject = PROJECTCONSTANT[1];
  var projectDrawerActive = false;

  $scope.openProject = function(project){
    $scope.activeProject = project;
    projectDrawerActive = true;
  };

  $scope.closeProject = function(){
    projectDrawerActive = false;
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
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
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
        };
      })(marker, i));

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function() {
      this.setZoom(8);
      google.maps.event.removeListener(boundsListener);
    });
  }
  initialize();
}]);
