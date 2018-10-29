/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.bidBanner', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/bidBanner', {
            templateUrl: 'mobile/templates/activities/bidBanner.html',
            controller: 'bidBanner'
        });
    }])
    .controller('bidBanner', function ($scope) {

    });