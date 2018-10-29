/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.redPacketRule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/redPacketRule', {
            templateUrl: 'mobile/templates/static/redPacketRule.html',
            controller: 'redPacketRule'
        });
    }])
    .controller('redPacketRule', function ($scope) {

    });