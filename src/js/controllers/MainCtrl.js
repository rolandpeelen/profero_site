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
