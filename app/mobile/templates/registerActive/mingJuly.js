
angular.module('myApp.mingJuly', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/mingJuly', {
            templateUrl: 'mobile/templates/registerActive/mingJuly.html',
            controller: 'mingJuly'
        });
    }])
    .controller('mingJuly', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {

   
    })