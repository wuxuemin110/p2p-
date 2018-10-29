
angular.module('myApp.tqActiveThree', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqActiveThree', {
            templateUrl: 'mobile/templates/registerActive/tqActiveThree.html',
            controller: 'tqActiveThree'
        });
    }])
    .controller('tqActiveThree', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })