'use strict';

/* Services */

var tirageServices = angular.module('tirageServices', ['ngResource']);

// http://lagrangien.jelastic.servint.net/tiragebom/webapi/tirage/initparticipants

tirageServices.factory('Tirage', ['$resource', function($resource) {
    return $resource('http://89.83.9.50/tirageapp/webapi/tirage/createtirage',
     {},
     {
      save: {method: 'POST',
              data : {
                users:{"initUserList" : [{"email":"pmekeze", "secureCode":"pat"}]},
                company:"population"
              },
              headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
    });


//     var transform = function(data) {
//     if (data === undefined) return data;
//
//     var clonedData = clone(data);
//     for (var property in clonedData)
//         if (property.substr(0, 1) == '$')
//             clonedData[property] = null;
//
//     return $.param(clonedData);
// };
  }
]);
// tirageServices.factory('Tirage', ['$resource',function($resource) {
//     return $resource('candidats.json',
//      {initUserList : '@initUserList'},
//      {
//       save: {method: 'POST',headers: {'Content-Type': 'application/json;charset=UTF-8'}}
//     });
//   }
// ]);
