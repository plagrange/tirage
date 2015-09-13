'use strict';

/* Services */

var tirageServices = angular.module('tirageServices', ['ngResource']);

// http://lagrangien.jelastic.servint.net/tiragebom/webapi/tirage/initparticipants

tirageServices.factory('Tirages', ['$resource', function($resource) {
  return $resource('https://89.83.9.50/tiragebom/webapi/tirage/createtirage', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Tirage', ['$resource', function($resource) {
  return $resource('https://89.83.9.50/tiragebom/webapi/tirage/tire', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Resultats', ['$resource', function($resource) {
  return $resource('https://89.83.9.50/tiragebom/webapi/tirage/results/:company', {}, {
    'query': {
      method: 'GET', isArray:true
    }
  });
}]);

tirageServices.factory('Resultat', ['$resource', function($resource) {
  return $resource('https://89.83.9.50/tiragebom/webapi/tirage/result/:email/:secureCode/:company', {}, {
    'query': {
      method: 'GET', isArray:false
    }
  });
}]);
