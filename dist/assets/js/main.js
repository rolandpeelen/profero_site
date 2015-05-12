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
        descriptionSmall: 'An epic software licensing system used by the dutch Police all over our beautiful little nether regions ',
        descriptionLarge: 'Back in 2005 we developed a piece of software for the dutch police that will help them manage their software licences.' +
        'The police then consisted of 26 different regions and our system made sure all of their licenses were managemed from one spot',
        tagline: 'We\'ve got you covered',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/politie.jpg',
        link: ''
      },
      2: {
        name: 'SlimFitted',
        descriptionSmall: 'A slim product configurator for the masses, built to configure your own SlimFitted shirt.',
        descriptionLarge: 'In 2014 we teamed up with the guys from SlimFitted to work on a revolutionary product configurator. Instead of using photographs to ' +
        'show their customers the shirt they configured, we used 3d visualisations. This meant we were able to be much more flexible in our approach and made sure' +
        'the system was future-proof.',
        tagline: 'What a time to live',
        partners: 'Peppr',
        categories: 'Software, Design',
        image: 'dist/assets/img/slimFitted.jpg',
        link: 'http://slimfitted.com/designer'
      },
      3: {
        name: 'Bachkoor Booking',
        descriptionSmall: 'A realtime bookingsystem. Instantly see when others book chairs, save your seats while you\'re away',
        descriptionLarge: 'In 2015 the \'Bachkoor Nijmegen\' asked us to built a new website to help create a more youthful image. We not only help them with their site' +
        'but also took the opportunity to build a custom and realtime bookingsystem. Contrary to other systems, this one works realtime. If one user clicks a chair, it immediatly' +
        'pops up as temporarily reserved on the page of all other active users.',
        tagline: 'Booking like a pro. that sounds good',
        partners: '',
        categories: 'Software, Design',
        image: 'dist/assets/img/bachkoorBooking.jpg',
        link: 'http://rolandpeelen.com/devcenter/bachkoor_booking'
      }
    });
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
  }
}]);
