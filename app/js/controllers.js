'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tirages', 'fAlert',
  function($scope, $rootScope, $routeParams, $location, Tirages, fAlert) {

    var numLigne = 2;

    var MIN_NB_LIGNE = 2;
    var MAX_NB_LIGNE = 15;

    $rootScope.isValide = false;
    $scope.company = '';

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
      var company = $scope.company;
      Tirages.save({
          'company': company,
          'users': userList
        }, function success() {
          fAlert.success("enregistrer avec succes !", {
            timeout: 3000
          });
        },
        function error(e) {
          alert(e);
          fAlert.error("une erreur s'est produite.\n" + e, {
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

tirageControllers.controller('tirageCtrl', ['$scope', '$rootScope', '$routeParams', '$location',  '$log','fAlert', 'Tirage',
  function($scope, $rootScope, $routeParams, $location, $log, fAlert, Tirage) {

    $rootScope.candidat = {};

    $scope.tirer = function() {
      var user = {
        email: $rootScope.candidat.email,
        secureCode: $rootScope.candidat.secureCode,
        company: $rootScope.candidat.company
      };
      Tirage.save(user, function success(data) {
          $location.path('/result');
        },
        function error(e) {
          $log.info(e);
          fAlert.error("une erreur s'est produite.", {
            timeout: 3000
          });
        });
    };
  }
]);

tirageControllers.controller('resultCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$log','fAlert', 'Resultat',
  function($scope, $rootScope, $routeParams, $location, $log, fAlert, Resultat) {

    $scope.resultats = [];
    $scope.init = function() {
      $log.info('resultCtrl - charger les results');

      Resultat.query({
        email: $rootScope.candidat.email,
        secureCode: $rootScope.candidat.secureCode,
        company: $rootScope.candidat.company
      }, function success(data) {
        $scope.resultats.push(data);
      }, function error() {
        fAlert.error("une erreur s'est produite.", {
          timeout: 3000
        });
      });
    }
  }
]);
