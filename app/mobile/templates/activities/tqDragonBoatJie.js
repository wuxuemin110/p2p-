angular.module('myApp.tqDragonBoatJie', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqDragonBoatJie', {
            templateUrl: 'mobile/templates/activities/tqDragonBoatJie.html',
            controller: 'tqDragonBoatJie'
        });
    }])
    .controller('tqDragonBoatJie', function ($scope) {

    })