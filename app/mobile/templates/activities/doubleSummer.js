angular.module('myApp.doubleSummer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/doubleSummer', {
            templateUrl: 'mobile/templates/activities/doubleSummer.html',
            controller: 'doubleSummer'
        });
    }])
    .controller('doubleSummer', function ($scope) {

    });