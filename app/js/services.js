'use strict';

/* Services */

var tirageServices = angular.module('tirageServices', ['ngResource']);

// http://lagrangien.jelastic.servint.net/tiragebom/webapi/tirage/initparticipants

tirageServices.factory('Tirages', ['$resource', function($resource) {
  return $resource('https://88.181.108.222/backoffice/createtirage', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Tirage', ['$resource', function($resource) {
  return $resource('https://88.181.108.222/tirage/tire', {}, {
    save: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  });
}]);

tirageServices.factory('Resultats', ['$resource', function($resource) {
  return $resource('https://88.181.108.222/backoffice/results/:company', {}, {
    'query': {
      method: 'GET', isArray:true
    }
  });
}]);

tirageServices.factory('Resultat', ['$resource', function($resource) {
  return $resource('https://88.181.108.222/backoffice/result/:email/:secureCode/:company', {}, {
    'query': {
      method: 'GET', isArray:false
    }
  });
}]);

tirageServices.factory('Compagny', ['$resource', function($resource) {
  return $resource('https://88.181.108.222/backoffice/verifycompany/:company', {}, {
    'query': {
      method: 'GET', isArray:true
    }
  });
}]);
