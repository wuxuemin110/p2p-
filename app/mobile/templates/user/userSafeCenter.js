'use strict';

angular.module('myApp.userSafeCenter', ['ngRoute', 'ngMaterial'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/userSafeCenter', {
			templateUrl: 'mobile/templates/user/userSafeCenter.html',
			controller: 'userSafeCenterCtrl'
		});
	}])

	.controller('userSafeCenterCtrl', function($location, $scope, $mdDialog, $timeout, $interval, UserWithdrawService, userSafeCenterService, $http, userOnlineBankService2) {

		$scope.password = {};
		$scope.UserInfo = {};
		$scope.idcard = {};
		$scope.tradePassword = {};
		$scope.banks = {};
		$scope.personaCurrent = 5;
		//		$scope.showfrom = 1;
		$scope.userCard = {};
		$scope.selectBankText = "选择银行"
		$scope.sendBtnText = '获取验证码';
		$scope.DisableSendBtn = false;
		$scope.cd = 60;
		$scope.showPasswordDiv = "arrowShow";
		$scope.showPasswordFlat = false;
		$scope.showfromDiv = "arrowShow";
		$scope.showfromFlat = false;
		$scope.showBankCardDiv = "arrowShow";
		$scope.showBankCardFlat = false;

		//修改密码效果
		$scope.showPassword = function() {
			$scope.showPasswordFlat = !$scope.showPasswordFlat;
			$scope.showPasswordDiv = $scope.showPasswordFlat ? 'arrowHide' : 'arrowShow';
			$scope.showfromFlat = false;
			$scope.showfromDiv = "arrowShow";
			$scope.showBankCardFlat = false;
			$scope.showBankCardDiv = "arrowShow";
		};

		//实名认证效果
		$scope.showRealnameFlat = false;
		$scope.showRealnameText = '设置';
		$scope.showRealname = function() {
			$scope.showRealnameFlat = !$scope.showRealnameFlat;
			$scope.showRealnameText = $scope.showRealnameFlat ? '收起' : '设置';
		};

		//修改交易密码

		$scope.showfrom = function() {
			if($scope.UserInfo.hasCardId != true) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请先实名认证!")
					.ok('确定')
				)

				return 0;

			}
			$scope.showfromFlat = !$scope.showfromFlat;
			$scope.showfromDiv = $scope.showfromFlat ? 'arrowHide' : 'arrowShow';

			$scope.showPasswordFlat = false;
			$scope.showPasswordDiv = "arrowShow";
			$scope.showBankCardFlat = false;
			$scope.showBankCardDiv = "arrowShow";
		};

		//银行卡已绑定

		$scope.showBankCard = function() {
			$scope.showBankCardFlat = !$scope.showBankCardFlat;
			$scope.showBankCardDiv = $scope.showBankCardFlat ? 'arrowHide' : 'arrowShow';

			$scope.showPasswordDiv = "arrowShow";
			$scope.showPasswordFlat = false;
			$scope.showfromDiv = "arrowShow";
			$scope.showfromFlat = false;
		};
		//银行卡未绑定
		$scope.bindBankCard = function() {
			if($scope.UserInfo.hasCardId != true) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请先实名认证!")
					.ok('确定')
				)

				return 0;

			}
		}
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = loginUrl;
			return;
		} else {

			//获取用户信息
			$scope.getUserInfo = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;

					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

					if($scope.UserInfo.hasCardId != true) { //判断是否实名认证过
						$scope.showRealnameFlat = true;

					}
					if($scope.UserInfo.hasTradePassword != true && $scope.UserInfo.hasCardId != false) { //已实名认证且没设置交易密码
						$scope.showfromFlat = true;
						$scope.showfromDiv = "arrowHide";

					}
					//				
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
			$scope.getUserInfo();

			//获取地区
			$scope.getCity = function() {

				$http.get("mobile/templates/user/json/city-picker.json").success(function(data) {
					$scope.cityData = data;
					$scope.userCard.province = "";
					$scope.userCard.city = "";
					$scope.userCard.district = "";
				});
			};
			$scope.getCity();
			
			if($scope.userCard.province){
				
				$scope.provinceTrue=true;
			}
			if($scope.userCard.city){
				$scope.cityTrue=true;
			}
			
			//打开选择省市区页面
			$scope.selectCityBg=function(){
				angular.element(".selectCityBg").show();
				angular.element(".province").show();
				$scope.userCard.province = "";
				$scope.userCard.city = "";
			    $scope.userCard.district = "";
			    $scope.provinceTrue=false;
			    $scope.cityTrue=false;
			}
			//关闭选择省市区页面
			$scope.cityClose=function(){
				angular.element(".selectCityBg").hide();
				angular.element(".selectCity").hide();
				$scope.userCard.province = "";
				$scope.userCard.city = "";
			    $scope.userCard.district = "";
			    $scope.provinceTrue=false;
			    $scope.cityTrue=false;
			}
			//选择省
			$scope.selectProvince = function(x) {
				$scope.userCard.province = x;
				$scope.provinceTrue=true;
				angular.element(".province").hide();
				angular.element(".city").show();
			}

			//选择市
			$scope.selectCity = function(x) {
				$scope.userCard.city = x;
				$scope.cityTrue=true;
				angular.element(".district").show();
				angular.element(".city").hide();
			}

			//选择区县

			$scope.selectDistrict = function(x) {
				$scope.userCard.district = x;
				angular.element(".district").hide();
				angular.element(".selectCityBg").hide();
			}
			//获取银行列表
			$scope.getBank = function() {

				$http.get(
					HOST_URL + "/user/bankcode/list").success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.banks = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

				});
			};
			$scope.getBank();

			// 获取银行卡信息
			UserWithdrawService.synUserCard(userId, token).then(function() {
				$scope.bankInfo = UserWithdrawService.getUserCard();
				//console.log($scope.bankInfo)
			});

			//点击显示关闭银行列表
			$scope.selectBankBtn = function() {
				angular.element(".selectBankBg").show();
			}
			$scope.bankClose = function() {
				angular.element(".selectBankBg").hide();
			}
			//选择银行
			$scope.selectBank = function(x) {

				$scope.selectBankText = x.bankName;
				$scope.userCard.bankCode = x.bankCode;
				angular.element(".selectBankBg").hide();
			}

			//获取用户实名信息
			$scope.getIdcard = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/idcard?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.getIdcard = responseData.resultData;

					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

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
			$scope.getIdcard();
			//		console.log($scope.UserInfo);

			//提交用户实名信息
			$scope.updateRealName = function(userCard) {
								console.log($scope.userCard);
				if(typeof($scope.userCard.realName) == "undefined") {
					userSafeCenterService.alertError("请输入真实姓名");
					return 0;
				}
				if(typeof($scope.userCard.idCard) == "undefined") {
					userSafeCenterService.alertError("请输入身份证号码");
					return 0;
				}
				if(typeof($scope.userCard.bankCode) == "undefined" || $scope.userCard.bankCode == "0") {
					userSafeCenterService.alertError("请选择银行");
					return 0;
				}
				if($scope.userCard.province == "" || $scope.userCard.province == "0") {
					userSafeCenterService.alertError("请选择省");
					return 0;
				}
				if($scope.userCard.city == "" || $scope.userCard.city == "0") {
					userSafeCenterService.alertError("请选择市");
					return 0;
				}
				if($scope.userCard.district == "" || $scope.userCard.district == "0") {
					userSafeCenterService.alertError("请选择县区");
					return 0;
				}
				if($scope.userCard.cardNumber == "" || typeof($scope.userCard.cardNumber) == "undefined") {
					userSafeCenterService.alertError("请输入银行卡号");
					return 0;
				}

				userSafeCenterService.updateRealName(token, $scope.userCard, userId).then(function() {
					$scope.userCard = {};
					$scope.selectBankText = "选择银行";
					$scope.userCard.bankCode = "";
				});

			};
			// function修改登录密码
			$scope.update = function() {
				if(typeof($scope.password.password) == "undefined" && typeof($scope.password.passwordNew) == "undefined" && typeof($scope.password.passwordNew2 == "undefined")) {
					userSafeCenterService.alertError("请完整输入以上信息");
					return 0;
				}
				if($scope.password.passwordNew != $scope.password.passwordNew2) {
					userSafeCenterService.alertError("您输入的两次密码不一致");
					return 0;
				}
				if($scope.password.passwordNew.length < 6) {
					userSafeCenterService.alertError("输入密码不能小于6位");
					return 0;
				}
				userSafeCenterService.updatePassword(token, $scope.password, userId).then(function() {
					$scope.password = {};
					// 修改密码过后提醒重新登录 20160525

				});
			};

			//设置交易密码
			$scope.updateTradePassword = function() {

				if(typeof($scope.tradePassword.pwd1) == "undefined" && typeof($scope.tradePassword.pwd2 == "undefined")) {
					userSafeCenterService.alertError("请输入交易密码");
					return 0;
				}
				if($scope.tradePassword.pwd1 != $scope.tradePassword.pwd2) {
					userSafeCenterService.alertError("您输入的两次密码不一致");
					return 0;
				}
				if($scope.tradePassword.pwd1.length < 6) {
					userSafeCenterService.alertError("输入密码不能小于6位");
					return 0;
				}
				if($scope.tradePassword.pwd1.length > 6) {
					userSafeCenterService.alertError("输入密码不能大于6位");
					return 0;
				}
				if(typeof($scope.tradePassword.code) == "undefined") {
					userSafeCenterService.alertError("请输入正确的验证码");
					return 0;
				}

				userSafeCenterService.updateTradePassword(token, $scope.tradePassword, userId, $scope.UserInfo).then(function() {
					$scope.tradePassword = {};

				});

			};

			/*安全退出*/
			$scope.showConfirm = function() {
				$mdDialog.show(
					$mdDialog.confirm()
					.clickOutsideToClose(true)
					.title('您确定要退出吗？')
					.textContent('您确定要退出吗？')
					.ok('确定')
					.cancel('取消')
				).then(function() {
					sessionStorage.clear();
					$location.path('/mobile/index');

				}, function() {

				});
			};

			//发送短信验证
			$scope.sendSms = function() {
				$http.get(
					HOST_URL + "/sms/trade?token=" + token, {}, {
						headers: {
							'Content-Type': 'application/json'
						}
					}
				).success(function() {
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
					//					$mdDialog.show(
					//						$mdDialog.alert()
					//						.clickOutsideToClose(true)
					//						.title('提示')
					//						.textContent("短信发送成功")
					//						.ok('确定')
					//					);
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('发生错误')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);
					//				$scope.changeVerificationCode();
				});
			};

		}
	})

	.factory('userSafeCenterService', function($http, $mdDialog, $location, userOnlineBankService2) {
		return {
			updatePassword: function(token, updatePassword, userId) {

				var data = angular.copy(updatePassword);
				data.token = token;

				return $http.post(
					HOST_URL + "/user/" + userId + "/updatePassword",
					$.param(data), {
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
							.textContent(responseData.resultMsg)
							.ok('确定')

						).finally(function() {
							sessionStorage.clear();
							alert(loginUrl)
							$location.path(loginUrl);
						});
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);
				});
			},
			updateRealName: function(token, userCard, userId) {
				userCard.token = token;
				return $http.post(
					HOST_URL + "user/" + userId + "/account/card/binding",
					$.param(userCard), {
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
							.textContent("实名认证成功，请设置交易密码！")
							.ok('确定')
						).finally(function() {
							window.location.reload();
						});
					} else {
						userOnlineBankService2.alertInfo(responseData);

					}

				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);
				});

			},
			updateTradePassword: function(token, tradePassword, userId, UserInfo) {
				var data = {
					"token": token,
					"pwd": tradePassword.pwd1,
					"code": tradePassword.code
				};
				return $http.post(
					HOST_URL + "user/" + userId + "/account/tradepwd",
					$.param(data), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				).success(function(responseData) {

					if(responseData.resultCode == "0") {
						if(UserInfo.hasBankCard != true) { //没有绑定银行卡
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title('提示')
								.textContent("交易密码设置成功，请绑定银行卡！")
								.ok('确定')
							).finally(function() {
								$location.path('/mobile/user/userBankCard');
							});
							return;
						}

						if(UserInfo.hasBankCard != false) { //绑定银行卡
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title('提示')
								.textContent("交易密码设置成功!")
								.ok('确定')
							).finally(function() {
								$location.path('/mobile/planList');
							});
							return;
						}
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);
				});

			},
			alertError: function(message) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent(message)
					.ok('确定')
				);
			}
		};
	});