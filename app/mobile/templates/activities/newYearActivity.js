/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.newYearActivity', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/newYearActivity', {
			templateUrl: 'mobile/templates/activities/newYearActivity.html',
			controller: 'newYearActivity'
		});
	}])
	.controller('newYearActivity', function($scope) {
		
	});