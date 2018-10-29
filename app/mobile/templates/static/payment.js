/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.payment', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/payment', {
            templateUrl: 'mobile/templates/static/payment.html',
            controller: 'payment'
        });
    }])
    .controller('payment', function ($scope) {

    });