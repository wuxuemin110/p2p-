
angular.module('myApp.tqActiveSecond', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqActiveSecond', {
            templateUrl: 'mobile/templates/registerActive/tqActiveSecond.html',
            controller: 'tqActiveSecond'
        });
    }])
    .controller('tqActiveSecond', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })