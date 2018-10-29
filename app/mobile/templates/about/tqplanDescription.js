'use strict';

angular.module('myApp.tqplanDescription', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqplanDescription', {
            templateUrl: 'mobile/templates/about/tqplanDescription.html',
            controller: 'tqplanDescription'
        });
    }])

    .controller('tqplanDescription', function ($scope, $location) {


    })
