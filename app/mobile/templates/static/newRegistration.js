/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.newRegistration', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/newregistration', {
            templateUrl: 'mobile/templates/static/newRegistration.html',
            controller: 'newRegistration'
        });
    }])
    .controller('newRegistration', function ($scope) {

    });