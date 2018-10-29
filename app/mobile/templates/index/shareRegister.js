'use strict';

angular.module('myApp.shareRegister', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/shareRegister', {
			templateUrl: 'mobile/templates/index/shareRegister.html',
			controller: 'shareRegister'
		});
	}])

	.controller('shareRegister', function($scope, $http, $location, $mdDialog, shareRegisterService, userOnlineBankService2,$timeout,$interval,registerService) {
		$scope.registerInfo = {
			'user': {
				
			},
			'userInfo': {
				'recommendCode': '',
				'channel':'',
				"phone":''
			},
			'code': ''
		};
		
		$scope.sendBtnText = '获取验证码';
		$scope.DisableSendBtn = false;
		$scope.cd = 60;
		
		$scope.checkbox = function($event) {　　
			var checked = $event.target;　　
			if(checked.checked) {　　　　
				angular.element('.spanBlock').show();　
				angular.element('.spanNone').hide();　　
			} else {　　　　
				angular.element('.spanBlock').hide();　
				angular.element('.spanNone').show();　　
			};
		};
		$scope.closeBox=function(){
			angular.element('.shareRegisterBox').hide();
			$location.path('/mobile/appDownload');
			
		}
		var urlPath = $location.search();
		if(urlPath.hasOwnProperty('recommendUser')) {
			$scope.registerInfo.userInfo.recommendCode = urlPath.recommendUser;
		}	
        if (urlPath.hasOwnProperty('channel')) {
           $scope.registerInfo.userInfo.channel = urlPath.channel;
           
        }
        if(urlPath.hasOwnProperty('phone')) {
			$scope.registerInfo.userInfo.phone = urlPath.phone;
		}
        
		$scope.register = function() {
			if($scope.registerInfo.userInfo.phone == undefined || $scope.registerInfo.userInfo.phone == '') {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('手机号不能为空')
					.ok('确定')
				);
				return;
			}

			if(!(/^1[3|4|5|7|8|9]\d{9}$/.test($scope.registerInfo.userInfo.phone))) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('手机号填写错误')
					.ok('确定')
				);
				return;
			}

			if($scope.registerInfo.user.password == undefined || $scope.registerInfo.user.password == '') {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('密码不能为空')
					.ok('确定')
				);
				return;
			}
			registerService.register($scope.registerInfo);
		};
		
		$scope.sendSms = function() {
			var data = {
				"phone": $scope.registerInfo.userInfo.phone,
				"from":"mobile"
			}
			$http.post(
				HOST_URL + "/sms/register",
				$.param(data), {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.sendBtnText = '发送成功';
					  $scope.DisableSendBtn = true;
		              $timeout(function () {
		                  $scope.sendBtnText =$scope.cd + '秒';
		              }, 1000).then(function () {
		                  var timer = $interval(function () {
		                      if ($scope.cd > 0) {
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
//					$mdDialog.show(
//						$mdDialog.alert()
//						.clickOutsideToClose(true)
//						.title('提示')
//						.textContent("短信发送成功")
//						.ok('确定')
//					);
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
				
			});
		};
	})

	.factory('shareRegisterService', function($http, $mdDialog, $location, userOnlineBankService2) {
		var registerInfoData = {};
		return {
			register: function(registerInfo) {
//				console.log(registerInfo);
				var alert;
				var param = "";
				registerInfoData = {
					"phone": registerInfo.userInfo.phone,
					"password": registerInfo.user.password,
					"code": registerInfo.code,
					"recommendCode": registerInfo.userInfo.recommendCode,
					"channel": registerInfo.userInfo.channel
				}
				//				console.log(registerInfoData);
				//易瑞特记录
				if(sessionStorage.getItem("tid")) {
					param += "?tid=" + sessionStorage.getItem("tid");
				}
				return $http.post(
					HOST_URL + "/user/register" + param,
					$.param(registerInfoData), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				).success(function(responseData) {
					//					console.log(responseData);
					if(responseData.resultCode == "0") {
						var registerData = responseData.resultData;
//						sessionStorage.setItem('userId', registerData.userId);
//						sessionStorage.setItem('userName', registerData.userName);
//						sessionStorage.setItem('role', registerData.role);
//						sessionStorage.setItem('token', registerData.token);
//						$mdDialog.show(
//							alert = $mdDialog.alert()
//							.clickOutsideToClose(true)
//							.title('提示')
//							.textContent('注册成功，3秒后自动跳转到个人中心。')
//							.ok('确定')
//						).finally(function() {
//							$location.path('/user/index');
//						});
//						setTimeout(function() {
//							//self.location = "/user/index";
//							$mdDialog.hide(alert);
//						}, 3000);
                       angular.element('.shareRegisterBox').show();
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
				});
			}
		}
	});