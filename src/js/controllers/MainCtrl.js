'use strict';

angular.module('proferoSite').controller('MainCtrl', ['$scope', 'PROJECTCONSTANT', function ($scope, PROJECTCONSTANT) {
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
  }
}]);
