'use strict';

/* Services */

var tirageServices = angular.module('tirageServices', ['ngResource']);

tirageServices.factory('Tirage', ['$resource',
  function($resource){
    return $resource('tirage/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
