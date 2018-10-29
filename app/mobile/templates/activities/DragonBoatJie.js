angular.module('myApp.DragonBoatJie', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/DragonBoatJie', {
            templateUrl: 'mobile/templates/activities/DragonBoatJie.html',
            controller: 'DragonBoatJie'
        });
    }])
    .controller('DragonBoatJie', function ($scope) {
      $(document).ready(function(){

      })
    })