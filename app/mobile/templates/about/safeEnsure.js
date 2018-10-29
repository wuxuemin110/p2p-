'use strict';

angular.module('myApp.safeEnsure', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/safeEnsure', {
            templateUrl: 'mobile/templates/about/safeEnsure.html',
            controller: 'safeEnsureCtrl'
        });
    }])

    .controller('safeEnsureCtrl', function ($scope, $location) {
           $scope.currentLi = 3;
    })