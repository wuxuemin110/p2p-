
angular.module('myApp.ReCast', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/ReCast', {
            templateUrl: 'mobile/templates/registerActive/ReCast.html',
            controller: 'ReCast'
        });
    }])
    .controller('ReCast', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })
