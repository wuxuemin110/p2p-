/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.newGuestWelfare', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/newGuestWelfare', {
			templateUrl: 'mobile/templates/activities/newGuestWelfare.html',
			controller: 'newGuestWelfare'
		});
	}])
	.controller('newGuestWelfare', function($scope) {
		$scope.gotoInvestFragment = function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid) {
				window.H5Method.gotoInvestFragment();
			}
			if(isIOS) {　　　　
				gotoInvestFragment();
			}

		}
	});