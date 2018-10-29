/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.tqredPacketRule', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqredPacketRule', {
            templateUrl: 'mobile/templates/static/tqredPacketRule.html',
            controller: 'tqredPacketRule'
        });
    }])
    .controller('tqredPacketRule', function ($scope) {

    });