
angular.module('myApp.tqActiveFirst', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqActiveFirst', {
            templateUrl: 'mobile/templates/registerActive/tqActiveFirst.html',
            controller: 'tqActiveFirst'
        });
    }])
    .controller('tqActiveFirst', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })