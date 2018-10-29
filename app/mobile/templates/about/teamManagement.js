'use strict';

angular.module('myApp.teamManagement', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/teamManagement', {
            templateUrl: 'mobile/templates/about/teamManagement.html',
            controller: 'teamManagementCtrl'
        });
    }])

    .controller('teamManagementCtrl', function ($scope, $location) {
    	
      
    })
//  .factory('AboutService', function ($http) {
//     
//      return {
//         
//      }
//  });