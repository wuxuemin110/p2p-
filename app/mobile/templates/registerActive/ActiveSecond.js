
angular.module('myApp.ActiveSecond', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/ActiveSecond', {
            templateUrl: 'mobile/templates/registerActive/ActiveSecond.html',
            controller: 'ActiveSecond'
        });
    }])
    .controller('ActiveSecond', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })