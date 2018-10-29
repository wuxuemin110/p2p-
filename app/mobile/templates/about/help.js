'use strict';

angular.module('myApp.help', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/help', {
            templateUrl: 'templates/about/help.html',
            controller: 'HelpCtrl'
        });
    }])

    .controller('HelpCtrl', function ($scope,HelpService) {
    	
    	$scope.liIndex=1;
    	
    	$scope.leftProblem1=1;
    	$scope.leftProblem2=1;
    	$scope.leftProblem3=1;
    })

    .factory('HelpService', function ($http) {
        return {}
    });