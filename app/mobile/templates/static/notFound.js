/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.notFound', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/notFound', {
            templateUrl: 'mobile/templates/static/notFound.html',
            controller: 'notFound'
        });
    }])
    .controller('notFound', function ($scope) {

    });