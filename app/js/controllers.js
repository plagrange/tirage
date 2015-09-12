'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tirage', 'fAlert',
  function($scope, $rootScope, $routeParams, $location, Tirages, Tirage, Resultat, fAlert) {

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

      var userList = "{initUserList:" + JSON.stringify($rootScope.candidats) + "}";
      Tirages.save({
          'company': 'company',
          'users': userList
        }, function success() {
          fAlert.success("enregistrer avec succes !", {
            timeout: 3000
          });
          // $location.path('/result');
        },
        function error() {
          fAlert.error("une erreur s'est produite.", {
            timeout: 3000
          });
        });

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

tirageControllers.controller('tirageCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'fAlert', 'Tirage',
  function($scope, $rootScope, $routeParams, $location, fAlert, Tirage) {

    $rootScope.candidat = {};


    $scope.tirer = function() {
      var data = JSON.stringify($rootScope.candidat);
      Tirage.save(data, function success(data) {
          // fAlert.success("enregistrer avec succes !", {timeout: 3000});
          // $rootScope.candidats.push($rootScope.candidat);
          alert(data)
          $location.path('/result');
        },
        function error() {
          fAlert.error("une erreur s'est produite.", {
            timeout: 3000
          });
        });
    };
  }
]);

tirageControllers.controller('resultCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'fAlert', 'Resultat',
  function($scope, $rootScope, $routeParams, $location, fAlert, Resultat) {

    $scope.init = function() {
      Resultat.query({
        company: 'company'
      }, function success(data) {
        alert(data);
      }, function error() {
        fAlert.error("une erreur s'est produite.", {
          timeout: 3000
        });
      });
    }
  }
]);
