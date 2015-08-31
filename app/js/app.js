'use strict';

/* App Module */

var tirageApp = angular.module('tirageApp', [
  'ngRoute',
  'tirageControllers',
  'tirageServices'
]);

tirageApp.config(['$routeProvider',
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
