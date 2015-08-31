'use strict';
/* App Module */

var app = angular.module('tirageApp', [
  'ngRoute',
  'tirageControllers',
  'tirageServices'
]);

app.config(['$routeProvider',
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
