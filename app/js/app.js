'use strict';

/* App Module */

var mtpApp = angular.module('mtpApp', [
  'ngRoute',
  'tirageControllers',
  'tirageServices'
]);

mtpApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/result', {
        templateUrl: 'result/result.html',
        controller: 'homeCtrl'
      }).
      when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
