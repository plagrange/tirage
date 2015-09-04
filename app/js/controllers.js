'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$routeParams', '$location',
  function($scope, $routeParams, $location) {
    var MIN_NB_LIGNE = 2
    var numLigne = 2;

    $scope.ajouterLigne = function() {
      $scope.candidats.push({
        id: numLigne++,
        email: "",
        pwd: ""
      });
    };

    $scope.init = function() {
      $scope.candidats = [{
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
      return $scope.candidats.length > MIN_NB_LIGNE;
    }

    $scope.supprimerLigne = function(p_candidat) {

      // for (var i =0; i <   $scope.candidats.length; i++)
      //  if (  $scope.candidats[i].id === p-) {
      //     someArray.splice(i,1);
      //     break;
      //  }
     $scope.candidats =  _.reject($scope.candidats, function(c){ return c.id == p_candidat.id; });
    };

    $scope.tirer = function(candidats) {
      $location.path('/result:candidats');
    };


  }
]);
