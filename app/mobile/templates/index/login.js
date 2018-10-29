'use strict';

angular.module('myApp.login', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/login', {
			templateUrl: 'mobile/templates/index/login.html',
			controller: 'LoginCtrl'
		});
	}])
.controller('LoginCtrl', function($scope, $http, $mdDialog,$location, LoginService, userOnlineBankService2) {
		$scope.user = {
			//'role': '100'
			"name":''
			
		};
        var urlPath = $location.search();
        if(urlPath.hasOwnProperty('phone')) {
			$scope.user.name = urlPath.phone;
		}
		$scope.login = function() {
			
			LoginService.login($scope.user)
		};
	
	})

	.factory('LoginService', function($http, $mdDialog, userOnlineBankService2) {
		var user;
		var userInfo;
		var userAuth;

		return {
			getAll: function() {
				return [user, userInfo, userAuth];
			},
			login: function(user) {
				var data = {					
					"from": "mobile",
					"name": user.name,
					"password": user.password
				}
				if(user.name == undefined || user.name == '') {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent('用户名不能为空')
						.ok('确定')
					);
					return;
				}

				if(user.password == undefined || user.password == '') {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent('请输入密码')
						.ok('确定')
					);
					return;
				}
				return $http.post(
					HOST_URL + "/user/login",
					$.param(data), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				).success(function(responseData) {
					if(responseData.resultCode == "0") {
						var loginData = responseData.resultData;
						sessionStorage.setItem('userId', loginData['user']['id']);
						sessionStorage.setItem('userName', loginData['user']['name']);
						sessionStorage.setItem('role', loginData['user']['role']);
						sessionStorage.setItem('token', loginData['userAuth']['token']);
						self.location = "/mobile/user/index";
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
			}
		}
	});