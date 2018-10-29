
angular.module('myApp.JulyDouble', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/JulyDouble', {
            templateUrl: 'mobile/templates/registerActive/JulyDouble.html',
            controller: 'JulyDouble'
        });
    }])
    .controller('JulyDouble', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {

   
    })