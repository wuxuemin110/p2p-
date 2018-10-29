/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.tqwithdrawRule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqwithdrawRule', {
            templateUrl: 'mobile/templates/static/tqwithdrawRule.html',
            controller: 'tqwithdrawRule'
        });
    }])
    .controller('tqwithdrawRule', function ($scope) {

    });