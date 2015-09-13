
var properties = angular.module('properties', []);


//debug enabled/disabled => should be false in production
properties.constant('isDebug', true);

properties.value('globalConfig', {
    tirageUrl : 'tirage'
});
