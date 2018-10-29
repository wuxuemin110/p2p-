'use strict';

angular.module('myApp.userInvite', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/userInvite', {
			templateUrl: 'mobile/templates/user/userInvite.html',
			controller: 'userInviteCtrl'
		});
	}])
	.controller('userInviteCtrl', function($scope,  $http, redPackageService, $location, userOnlineBankService2) {
		var role = sessionStorage.role;
		$scope.recommend = {};
		
		var userId = sessionStorage.getItem("userId");
		var token = sessionStorage.getItem("token");

		if(token == undefined) {
			alert("您尚未登录！");
			self.location = "/login";
			return 0;
		} else {
			
			//获取推荐链接
			$scope.recommend = function() {
				$http.get(
					HOST_URL + "/user/account/" + userId + "/recommend/url?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.recommend = responseData.resultData;
						new QRCode(document.getElementById("qrcode"), $scope.recommend.url);
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					//				console.log(responseData);

				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);

				});
			};
			$scope.recommend();
			
			
		}
	});