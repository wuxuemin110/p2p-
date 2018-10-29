/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.registration', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/registration', {
            templateUrl: 'mobile/templates/static/registration.html',
            controller: 'registration'
        });
    }])
    .controller('registration', function ($scope) {

    });