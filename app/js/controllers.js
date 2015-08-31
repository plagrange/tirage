'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$routeParams', '$location',
  function($scope, $routeParams, $location) {



    $scope.ajouterLigne = function() {
      $scope.candidats.push({
        email: "",
        pwd: ""
      });
    };

    $scope.init = function() {
      $scope.candidats = [{
        "email": "",
        "pwd": ""
      }, {
        "email": "",
        "pwd": ""
      }];
    };
    $scope.supprimerLigne = function() {

    };

    $scope.tirer = function(candidats) {
      $location.path('/result:candidats');
    };


  }
]);
