/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.tqonlineMarking', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqonlineMarking', {
            templateUrl: 'mobile/templates/activities/tqonlineMarking.html',
            controller: 'tqonlineMarking'
        });
    }])
    .controller('tqonlineMarking', function ($scope) {

    });