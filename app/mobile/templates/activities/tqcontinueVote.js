/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.tqcontinueVote', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqcontinueVote', {
            templateUrl: 'mobile/templates/activities/tqcontinueVote.html',
            controller: 'tqcontinueVote'
        });
    }])
    .controller('tqcontinueVote', function ($scope) {

    });