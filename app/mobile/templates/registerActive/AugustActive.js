
angular.module('myApp.AugustActive', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/AugustActive', {
            templateUrl: 'mobile/templates/registerActive/AugustActive.html',
            controller: 'AugustActive'
        });
    }])
    .controller('AugustActive', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })