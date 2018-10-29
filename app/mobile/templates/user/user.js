'use strict';

angular.module('myApp.user', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/index', {
			templateUrl: 'mobile/templates/user/user.html',
			controller: 'UserCtrl'
		});
	}])

	.controller('UserCtrl', function($scope, $rootScope, UserService, $http, $mdDialog, $location, userOnlineBankService2) {
		// 判断登录
		$scope.currentLi=4;
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		var role = sessionStorage.role;
		//		$scope.data = {};
		$scope.userAccount = {
			'waiting':0,
			'pocket':0,
			'rates':0
		};
		$scope.UserInfo = {};
		$scope.roletouzi = role;
		$scope.personaCurrent = 1;
		if(token == undefined) {

			$mdDialog.show(
				$mdDialog.alert()
				.clickOutsideToClose(true)
				.title('提示')
				.textContent("您尚未登录！")
				.ok('确定')
			).finally(function() {
				$location.path(loginUrl);
			});
			return;

		} else {

			$scope.getUserInfo = function() {
				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;
						//判断是否已实名认证
						if($scope.UserInfo.hasCardId != true) {
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title('提示')
								.textContent("请先实名认证!")
								.ok('确定')
							).finally(function() {
								$location.path('/mobile/user/userSafeCenter');
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
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);

				});
			}
			$scope.getUserInfo();
			//点击头像跳转
            $scope.jumpUserSafeCenter=function(){
            	$location.path('/mobile/user/userSafeCenter');
            }
            
			UserService.synUserAccount(userId, token).success(function() {
				$scope.userAccount = UserService.getUserAccount();
				$scope.data = UserService.getUserAccount();
				$scope.data.all = ($scope.data.money + $scope.data.freezingMoney + $scope.data.repaying);

			});

			//点击充值按钮
			$scope.userRecharge = function(type) {
				//提示先实名认证

				if($scope.UserInfo.hasCardId != true) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent("请先实名认证!")
						.ok('确定')
					).finally(function() {
						$location.path('/mobile/user/userSafeCenter');
					});
					return;
				}

				if($scope.UserInfo.hasBankCard != true) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent("请先绑定银行卡!")
						.ok('确定')
					).finally(function() {
						$location.path('/mobile/user/userBankCard');
					});
					return;

				}
				if($scope.UserInfo.hasTradePassword != true) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent("请先设置交易密码!")
						.ok('确定')
					).finally(function() {
						$location.path('/mobile/user/userSafeCenter');
					});
					return;
				}

				self.location = "/mobile/user/" + type;

			}
			//个人中心-投资数据

			$scope.investData = function() {
				return $http.get(
					HOST_URL + "user/" + userId + "/investData?token=" + token).success(function(responseData) {

					if(responseData.resultCode == "0") {
						$scope.investDataInfo = responseData.resultData;
						
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					//				
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
			$scope.investData();
		

		}
	})

	.factory('UserService', function($http, $mdDialog, userOnlineBankService2) {
		var user;
		var userInfo;
		var userAccount;
		var userRealPlans;
		var userExpPlans;
		var bankCards;
		var voucher;
		var userExAccount;
		return {
			getUser: function() {
				return user;
			},
			getVoucher: function() {
				return voucher;
			},
			getUserInfo: function() {
				return userInfo;
			},
			getUserAccount: function() {
				return userAccount;
			},
			getUserExAccount: function() {
				return userExAccount;
			},
			getUserRealPlans: function() {
				return userRealPlans;
			},
			getBankCards: function() {
				return bankCards;
			},
			// 同步用户
			synUser: function(token) {
				return $http.get(HOST_URL + "/user?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						user = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
				}).error(function(responseData) {
					sessionStorage.clear();
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			},
			// 同步用户账户
			synUserAccount: function(userId, token) {
				return $http.get(HOST_URL + "/user/" + userId + "/accountInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						userAccount = responseData.resultData;
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
			},
			synUserExAccount: function(userId, token) {
				return $http.get(HOST_URL + "/user/" + userId + "/exAccount?token=" + token).success(function(responseData) {
					userExAccount = responseData;
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			},
			// 同步用户已投资计划
			synUserRealPlans: function() {

			},
			// 同步用户已投资体验计划
			synUserExpPlans: function() {

			},
			// 充值
			recharge: function() {},
			// 提现
			withdraw: function() {},
			// 修改用户密码
			updatePassword: function() {},
			// 修改用户交易密码
			updateAccountPassword: function() {},
			voucher: function(userId, token) {
				return $http.get(HOST_URL + "/user/" + userId + "/account/vouchers?token=" + token).success(function(responseData) {
					voucher = responseData;
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('发生错误')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			},
			//			addBankCard: function(userId, token, userCard) {
			//				return $http.post(
			//					HOST_URL + "/user/" + userId + "/account/card?token=" + token,
			//					userCard, {
			//						headers: {
			//							'Content-Type': 'application/json'
			//						}
			//					}
			//				).success(function(responseData) {}).error(function(responseData) {
			//					$mdDialog.show(
			//						$mdDialog.alert()
			//						.clickOutsideToClose(true)
			//						.title('发生错误')
			//						.textContent(responseData['error'])
			//						.ok('确定')
			//					);
			//				});
			//			}
		}
	}).directive('pie', function() {
		return {
			scope: {
				id: "@",
				legend: "=",
				//item: "=",    
				data: "="
			},
			restrict: 'E',
			template: '<div style="height:200px;"></div>',
			replace: true,
			link: function($scope, element, attrs, controller) {
				//				console.log($scope,element, attrs);
				//				console.log($scope.data.all,$scope.data.money,$scope.data.repaying,$scope.data.freezingMoney);
				var a = [];
				var option = {
					title: {
						text: $scope.data.all,
						subtext: '账户总额（元）',
						x: 'center',
						y: '40%',
						textStyle: {
							fontWeight: 'bold',
							fontSize: 24,
							color: "#333"
						},
						subtextStyle: {
							color: '#333', // 副标题文字颜色
							fontSize: 14,
						}
					},
					series: [{
						name: '个人数据',
						type: 'pie',
						radius: ['82%', '90%'],
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: false,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},

						data: [{
							value: $scope.data.money,
							name: '可用余额',
							itemStyle: {
								normal: {

									color: '#FA852E'
								}

							}
						}, {
							value: $scope.data.repaying,
							name: '代收金额',
							itemStyle: {
								normal: {

									color: '#704C99'
								}
							}
						}, {
							value: $scope.data.freezingMoney,
							name: '冻结金额',
							itemStyle: {
								normal: {

									color: '#FFCD44'
								}
							}

						}]
					}],
					//   color: ['rgb(250,133,46)','rgb(255,205,68)','rgb(112,76,153)']
				};
				var myChart = echarts.init(document.getElementById($scope.id), 'macarons');
				myChart.setOption(option);
			}
		};
	});