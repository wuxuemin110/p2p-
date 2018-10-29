
angular.module('myApp.National', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/National', {
            templateUrl: 'mobile/templates/registerActive/National.html',
            controller: 'National'
        });
    }])
    .controller('National', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })