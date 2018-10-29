/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.tqregistration', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqregistration', {
            templateUrl: 'mobile/templates/static/tqregistration.html',
            controller: 'tqregistration'
        });
    }])
    .controller('tqregistration', function ($scope) {

    });