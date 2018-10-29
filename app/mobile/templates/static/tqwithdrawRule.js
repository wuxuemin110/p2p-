/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.withdrawRule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/withdrawRule', {
            templateUrl: 'mobile/templates/static/withdrawRule.html',
            controller: 'withdrawRule'
        });
    }])
    .controller('withdrawRule', function ($scope) {

    });