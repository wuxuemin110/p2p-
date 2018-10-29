'use strict';

angular.module('myApp.findPassword', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/findPassword', {
			templateUrl: 'mobile/templates/index/findPassword.html',
			controller: 'FindPasswordCtrl'
		});
	}])
	.controller('FindPasswordCtrl', function($scope, $http, $mdDialog, $timeout, $interval, FindPasswordService, $location, userOnlineBankService2) {
		$scope.find = {
			//     
		};
		$scope.sendBtnText = '获取验证码';
		$scope.DisableSendBtn = false;
		$scope.cd = 60;
		//发送短信验证
		$scope.sendSms = function() {
			var data = {
				"from": "mobile",
				"phone": $scope.find.phone
			}
			$http.post(
				HOST_URL + "/sms/findpwd",
				$.param(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			).success(function(responseData) {

				if(responseData.resultCode == "0") {
					$scope.sendBtnText = '发送成功';
					$scope.DisableSendBtn = true;
					$timeout(function() {
						$scope.sendBtnText = $scope.cd + '秒';
					}, 1000).then(function() {
						var timer = $interval(function() {
							if($scope.cd > 0) {
								--$scope.cd;
								$scope.sendBtnText = $scope.cd + '秒';
							} else {
								$scope.DisableSendBtn = false;
								$interval.cancel(timer);
								$scope.cd = 60;
								$scope.sendBtnText = '重新发送';
							}
						}, 1000);
					});

				} else {
					userOnlineBankService2.alertInfo(responseData);
				}

			}).error(function(responseData) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('发生错误')
					.textContent(responseData['resultMsg'])
					.ok('确定')
				);
				$scope.changeVerificationCode();
			});
		};

		$scope.findPassword = function() {
			if($scope.find.phone == undefined || $scope.find.phone == '') {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('手机号不能为空')
					.ok('确定')
				);
				return;
			}
			if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.find.phone))) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('手机号填写错误')
					.ok('确定')
				);
				return;
			}
			if($scope.find.code == undefined || $scope.find.code == '') {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('短信验证码不能为空')
					.ok('确定')
				);
				return;
			}

			if($scope.find.pwd1 != $scope.find.pwd2) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('您输入的两次密码不一致')
					.ok('确定')
				);
				return;
			}
			if($scope.find.pwd1.length < 6) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('输入密码不能小于6位')
					.ok('确定')
				);
				return;
			}
			if($scope.find.pwd1.length > 16) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('输入密码不能大于16位')
					.ok('确定')
				);
				return;
			}
			var findData = {
				"phone": $scope.find.phone,
				"pwd": $scope.find.pwd1,
				"code": $scope.find.code
			}
			$http.post(
				HOST_URL + "/user/findpwd",
				$.param(findData), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					).finally(function() {
						$location.path('/mobile/login');
					});
				} else {
					userOnlineBankService2.alertInfo(responseData);
				}
			}).error(function(responseData) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent(responseData['resultMsg'])
					.ok('确定')
				);
			});
		};

	})

	.factory('FindPasswordService', function($http, $mdDialog) {
		return {}
	});