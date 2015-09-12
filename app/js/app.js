'use strict';
/* App Module */

var app = angular.module('tirageApp', [
  'ngRoute',
  'tirageControllers',
  'tirageServices',
  'angular-storage',
  'properties',
  'fpoly'
], function($httpProvider) {

  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '',
      name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/result', {
      templateUrl: 'result/result.html',
      controller: 'resultCtrl'
    }).
    when('/home', {
      templateUrl: 'home/home.html',
      controller: 'homeCtrl'
    }).
    when('/tirage', {
      templateUrl: 'tirage/tirage.html',
      controller: 'tirageCtrl'
    }).
    when('/mode-emploi', {
      templateUrl: 'modeEmploi/mode-emploi.html'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }
]);



/**
 * Affiche un loader en cas d'appel distant
 */
app.config(function ($provide, $httpProvider) {
    $provide.factory('httpShowLoadingInterceptor', function ($q, $log, $rootScope, $injector) {
        return {
            request: function (config) {
                $rootScope.showLoading = true;
                return config || $q.when(config);
            },
            requestError: function (rejection){
                $rootScope.showLoading = serviceInPending();
                return $q.reject(rejection);
            },
            response: function (response) {
                $rootScope.http = $rootScope.http || $injector.get('$http');
                $rootScope.showLoading = serviceInPending();
                return response || $q.when(response);
            },
            responseError : function (rejection) {
                $rootScope.showLoading = serviceInPending();
                return $q.reject(rejection);
            }
        };

        /**
         * indique si des services sont en cours
         * @returns {boolean}
         */
        function serviceInPending() {
            $rootScope.http = $rootScope.http || $injector.get('$http');
            return $rootScope.http.pendingRequests.length > 0;
        }
    });

    $httpProvider.interceptors.push('httpShowLoadingInterceptor');
});
