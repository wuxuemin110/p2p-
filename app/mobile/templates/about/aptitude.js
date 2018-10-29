'use strict';

angular.module('myApp.aptitude', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/aptitude', {
            templateUrl: 'mobile/templates/about/aptitude.html',
            controller: 'aptitudeCtrl'
        });
    }])

    .controller('aptitudeCtrl', function ($scope, $location) {
    	
      
    })
//  .factory('AboutService', function ($http) {
//     
//      return {
//         
//      }
//  });