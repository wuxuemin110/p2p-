'use strict';

angular.module('myApp.planDescription', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/planDescription', {
            templateUrl: 'mobile/templates/about/planDescription.html',
            controller: 'planDescription'
        });
    }])

    .controller('planDescription', function ($scope, $location) {
    	
      
    })
//  .factory('AboutService', function ($http) {
//     
//      return {
//         
//      }
//  });