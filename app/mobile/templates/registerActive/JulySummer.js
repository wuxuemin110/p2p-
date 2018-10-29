
angular.module('myApp.JulySummer', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/JulySummer', {
            templateUrl: 'mobile/templates/registerActive/JulySummer.html',
            controller: 'JulySummer'
        });
    }])
    .controller('JulySummer', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {

   
    })