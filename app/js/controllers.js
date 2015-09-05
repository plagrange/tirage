'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$location',
  function($scope, $rootScope, $routeParams, $location) {

    var numLigne = 2;

    var MIN_NB_LIGNE = 2;
    var MAX_NB_LIGNE = 15;

    $rootScope.isValide = false;

    $scope.ajouterLigne = function() {
      $rootScope.candidats.push({
        id: numLigne++,
        email: "",
        pwd: ""
      });
    };

    $scope.init = function() {
      $rootScope.candidats = [{
        "id": "0",
        "email": "",
        "pwd": ""
      }, {
        "id": "1",
        "email": "",
        "pwd": ""
      }];
    };

    $scope.enableSupprimerLigne = function() {
      return $rootScope.candidats.length > MIN_NB_LIGNE;
    }
    $scope.enableAjouterLigne = function() {
      return $rootScope.candidats.length < MAX_NB_LIGNE;
    }

    $scope.supprimerLigne = function(p_candidat) {
      $rootScope.candidats = _.reject($rootScope.candidats, function(c) {
        return c.id == p_candidat.id;
      });
    };

    $scope.tirer = function(candidats) {
      $location.path('/result');
    };

    $scope.valider = function() {
      $rootScope.isValide = true;
    }

    $scope.faireTirage = function() {
      var count = 0;
      for (var i = 0; i < $rootScope.candidats.length; i++) {
        $rootScope.candidats[i].passage = ++count;
      }
    };
  }
]);

tirageControllers.controller('resultCtrl', ['$scope', '$rootScope', '$routeParams', '$location',
  function($scope, $rootScope, $routeParams, $location) {


  }
]);
