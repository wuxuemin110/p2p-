
angular.module('myApp.ActiveThree', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/ActiveThree', {
            templateUrl: 'mobile/templates/registerActive/ActiveThree.html',
            controller: 'ActiveThree'
        });
    }])
    .controller('ActiveThree', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })