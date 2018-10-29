/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.appDownload', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/appDownload', {
            templateUrl: 'mobile/templates/appDownload/appDownload.html',
            controller: 'appDownload'
        });
    }])
    .controller('appDownload', function ($scope) {

    });