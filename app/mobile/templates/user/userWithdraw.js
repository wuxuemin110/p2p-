'use strict';

angular.module('myApp.userWithdraw', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/userWithdraw', {
			templateUrl: 'mobile/templates/user/userWithdraw.html',
			controller: 'UserWithdrawCtrl'
		});
	}])

	.controller('UserWithdrawCtrl', function($scope, UserService, UserWithdrawService, $timeout, $interval, $mdDialog, $http, $location, userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};
		$scope.userCard = {};
		$scope.UserInfo = {};
		$scope.withdrawCount = {};
		$scope.tradeRecord.money ='';
		$scope.sendBtnText = '发送短信';
		$scope.DisableSendBtn = false;
		
		$scope.cd = 60;
		// 检测登录
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = loginUrl;
			return 0;
		} else {
			
// 获取账户信息
			UserService.synUserAccount(userId, token).then(function() {
				$scope.userAccount = UserService.getUserAccount();
			});
						
			$scope.$watch('tradeRecord.money', function(newValue, oldValue) {
				$scope.withdrawfee=2;
				var money=$scope.tradeRecord.money*100;
				var userAccountMoney=parseInt($(".userAccountMoney").attr("data"))/100;
				$scope.withdrawCount.count=0;
				$scope.withdrawCount.fee=0;
				if($scope.tradeRecord.money>99&&$scope.tradeRecord.money<userAccountMoney){
                 $http.get(
					HOST_URL + "user/account/" + userId + "/withdraw/info?token=" + token+"&money="+money).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.withdrawCount = responseData.resultData;
						
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
				}
				if($scope.tradeRecord.money>userAccountMoney || $scope.tradeRecord.money<100){
                $scope.withdrawfee=0;
				$scope.withdrawCount.fee=0;
				$scope.withdrawCount.count=0;
				}
            });
			
			
			// 获取银行卡信息
			UserWithdrawService.synUserCard(userId, token).then(function() {
				$scope.userCard = UserWithdrawService.getUserCard();
				
				
			});
		}


		// function
		$scope.withdraw = function() {
			var tradeRecordData = {};
			//          console.log($scope.userAccount);
			if($scope.userAccount.money < $scope.tradeRecord.money) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("提现金额大于账户余额")
					.ok('确定')
				);
				return;
			}
			if($scope.tradeRecord.money < 100) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("提现金额不能小于100")
					.ok('确定')
				);
				return;
			}
			var moneyData = $scope.tradeRecord.money;
			//限制最多只能输入2位小数
			var type = /^0{1}([.]\d{1,2})?$|^[1-9]\d*([.]{1}[0-9]{1,2})?$/;
			var flag = type.test(moneyData);
			//			console.log(flag);
			if(!flag) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('最多只能输入2位小数')
					.ok('确定')
				);
				return;
			}
			if($scope.tradeRecord.tradePassword == "" || $scope.tradeRecord.tradePassword == undefined || $scope.tradeRecord.tradePassword == null) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('温馨提示')
					.textContent("交易密码不能为空")
					.ok('确定')
				);
				return;
			}
			tradeRecordData.money = $scope.tradeRecord.money;
			
			tradeRecordData.tradePassword = $scope.tradeRecord.tradePassword;
			UserWithdrawService.withdraw(userId, token, tradeRecordData);
		};
		
	})

	.factory('UserWithdrawService', function($http, $mdDialog, $location, userOnlineBankService2) {
		var userInfo;
		var userCard;
		return {
			getUserInfo: function() {
				return userInfo;
			},
			getUserCard: function() {
				return userCard;
			},
			// 同步用户信息
			synUserInfo: function(userId, token) {
				return $http.get(HOST_URL + "/user/" + userId + "/info?token=" + token).success(function(responseData) {
					userInfo = responseData.userInfo;
				}).error(function(responseData) {
					// 无响应
				});
			},
			synUserCard: function(userId, token) {
				return $http.get(HOST_URL + "/user/" + userId + "/account/cards?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						userCard = responseData.resultData;
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
					//					}

				});
			},
			withdraw: function(userId, token, tradeRecord) {
				if(tradeRecord.money < 2) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent("提现金额不能少于2元")
						.ok('确定')
					);
					return;
				}
				tradeRecord.money = parseInt(parseFloat(tradeRecord.money).toFixed(2) * 100);
				tradeRecord.token = token;
			
				return $http.post(
					HOST_URL + "/user/account/" + userId + "/withdraw/apply",
					$.param(tradeRecord), {
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
							.textContent('提现申请已提交，系统将尽快为您处理')
							.ok('确定')
						).finally(function() {
							$location.path('/mobile/user/fundDetails');
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
			}
		};
	});