'use strict';

/* Services */

var tirageServices = angular.module('tirageServices', ['ngResource']);

// http://lagrangien.jelastic.servint.net/tiragebom/webapi/tirage/initparticipants

tirageServices.factory('Tirages', ['$resource', function($resource) {
  return $resource('http://89.83.9.50/tirageapp/webapi/tirage/createtirage', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Tirage', ['$resource', function($resource) {
  return $resource('http://89.83.9.50/tirageapp/webapi/tirage/tire', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Resultat', ['$resource', function($resource) {
  return $resource('http://89.83.9.50/tirageapp/webapi/tirage/results/:company', {}, {
    'query': {
      method: 'GET'
    }
  });
}]);
