'use strict';

/* Controllers */

var tirageControllers = angular.module('tirageControllers', []);

tirageControllers.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$location','$log', 'Tirages', 'fAlert',
  function($scope, $rootScope, $routeParams, $location,$log, Tirages, fAlert) {

    var numLigne = 2;

    var MIN_NB_LIGNE = 2;
    var MAX_NB_LIGNE = 15;

    $rootScope.isValide = false;

    $rootScope.company = '';

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

    $scope.create = function() {

      var userList = "{initUserList:" + JSON.stringify($rootScope.candidats) + "}";
      var company = $scope.company;
      Tirages.save({
          'company': company,
          'users': userList
        }, function success() {
          fAlert.success("enregistrer avec succes !", {
            timeout: 3000
          });
          //backup for next page
          $rootScope.company = company;
          $location.path('/tirage-dashboard');
        },
        function error(e) {
          $log.info(e);
          fAlert.error("une erreur s'est produite : " + e.statusText, {
            timeout: 3000
          });
        });
    };

    $scope.valider = function() {
      $rootScope.isValide = true;
    }

  }
]);

tirageControllers.controller('tirageCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$log','fAlert', 'Tirage',
  function($scope, $rootScope, $routeParams, $location, $log, fAlert, Tirage) {

    $rootScope.candidat = {};
    // Retrieve routeParams
    $scope.email = $routeParams.email;
    $scope.company = $routeParams.company;

    $scope.tirer = function() {
      var email = $scope.email == undefined ? $rootScope.candidat.email :$scope.email;
      var company = $scope.company == undefined ? $rootScope.candidat.company :$scope.company;

      var user = {
        email: email,
        secureCode: $rootScope.candidat.secureCode,
        company: company
      };
      var routePath = '/result/'+ company + '/' + email;
      Tirage.save(user, function success(data) {
          $location.path(routePath);
        },
        function error(e) {
          $log.info("erreur lors du tirage : " + e);
          fAlert.error("une erreur s'est produite : " + e.statusText, {
            timeout: 3000
          });
        });
    };
  }
]);

tirageControllers.controller('resultCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$log','fAlert', 'Resultat',
  function($scope, $rootScope, $routeParams, $location, $log,fAlert, Resultat) {

    // Retrieve routeParams
    $scope.email = $routeParams.email;
    $scope.company = $routeParams.company;

    $scope.resultats = [];
    $scope.init = function() {
        if (!$rootScope.candidat.secureCode) {
          $log("can't recovered secureCode");
          return;
        }
      $log.info('resultCtrl - charger les results');
      Resultat.query({
        email: $scope.email,
        secureCode: $rootScope.candidat.secureCode,
        company: $scope.company
      }, function success(data) {
        $scope.resultats.push(data);
      }, function error(e) {
        fAlert.error("une erreur s'est produite : " + e.statusText, {
          timeout: 3000
        });
      });
    }
  }
]);

tirageControllers.controller('tirage-dashboardCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$log','fAlert',
  function($scope, $rootScope, $routeParams, $location, $log,fAlert) {

    $scope.candidats = $rootScope.candidats != undefined ? $rootScope.candidats : {};
    $scope.company = $rootScope.company != undefined ? $rootScope.company :'';

    $scope.buildLink = function() {
        for (var i = 0; i < $scope.candidats.length; i++) {
          $scope.candidats[i].link = '#/tirage/'+ $scope.company + '/'+ $scope.candidats[i].email;
          $scope.candidats[i].numero = '';
        }
    }


  }
]);
