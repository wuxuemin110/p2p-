
angular.module('myApp.xgftJuly', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/xgftJuly', {
            templateUrl: 'mobile/templates/registerActive/xgftJuly.html',
            controller: 'xgftJuly'
        });
    }])
    .controller('xgftJuly', function ($scope, $http, $location, $mdDialog, shareRegisterService2, userOnlineBankService2) {

   
    })