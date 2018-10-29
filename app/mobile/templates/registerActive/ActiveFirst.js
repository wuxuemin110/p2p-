
angular.module('myApp.ActiveFirst', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/ActiveFirst', {
            templateUrl: 'mobile/templates/registerActive/ActiveFirst.html',
            controller: 'ActiveFirst'
        });
    }])
    .controller('ActiveFirst', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {


    })