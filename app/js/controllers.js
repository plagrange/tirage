'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tirage',
  function($scope, $rootScope, $routeParams, $location, Tirage) {

    var numLigne = 2;

    var MIN_NB_LIGNE = 2;
    var MAX_NB_LIGNE = 15;

    $rootScope.isValide = false;

    $scope.ajouterLigne = function() {
      $rootScope.candidats.push({
        id: numLigne++,
        email: "",
        secureCode: ""
      });
    };

    $scope.init = function() {
      $rootScope.candidats = [{
        "id": "0",
        "email": "",
        "secureCode": ""
      }, {
        "id": "1",
        "email": "",
        "secureCode": ""
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

    $scope.tirer = function() {
      Tirage.save({'compagny' :'compagny' , 'users' : $rootScope.candidats})
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
