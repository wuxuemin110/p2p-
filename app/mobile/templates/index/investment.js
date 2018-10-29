'use strict';

angular.module('myApp.investment', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/investment/:id', {
			templateUrl: 'mobile/templates/index/investment.html',
			controller: 'investmentCtrl'
		});
	}])

	.controller('investmentCtrl', function($scope, $rootScope, $routeParams, $mdDialog, $mdMedia, InvestmentService, $location, $http, redPackageService, userOnlineBankService2) {
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$scope.money = "";
		$scope.isShow = false;
		$scope.investments = [];
		$scope.UserInfo = {};
		
        $scope.useRedPacket="未使用";
        $scope.useRate="未使用";
		$scope.password = '';
        $scope.oneRedVoucher={
        	"id":0,
        	"voucherValue":0
        };
		$scope.useRateVoucher={
        	"id":0,
        	"voucherValue":0
       };
		

		// 判断登录
		if(token == undefined) {			
            $mdDialog.show(
                  $mdDialog.alert()
	                      .clickOutsideToClose(true)
	                      .title('请先登录')
                      .ok('确定')
	              ).finally(function () {
	                  $location.path('/mobile/login');
	              });
	              return;
		} else {

			$scope.rightShow = 2;
			$scope.getUserInfo = function() {

				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;
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
			$scope.getUserInfo();

		};

		$scope.synPlan = function() {

			InvestmentService.synPlan($routeParams.id).then(function() {

				$scope.plan = InvestmentService.getPlan();
				

			});
		};
		$scope.synPlan();

		
		$scope.getRedpack = function(userId,typeid) {
			return $http.get(
//					HOST_URL + "/user/" + userId + "/account/canusevouchers?token=" + token + "&type="+typeid+"&amount=" + $scope.money*100 + "&cycle=" + $scope.plan.staging)
			        HOST_URL + "/user/" + userId + "/account/canusevouchers/"+$scope.plan.planId+"?token=" + token + "&type="+typeid+"&amount=" + $scope.money*100)
				.success(function(responseData) {

					if(responseData.resultCode == "0") {
						angular.element(".useRedPacketBg").show();
						$scope.redVouchers = responseData.resultData;
//						console.log($scope.redVouchers);
						$scope.typeId=typeid;
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

		//查询红包信息
		$scope.useRedPacketClick = function() {
			if($scope.money != "" & $scope.money != null) {
				
				$scope.getRedpack(userId,0);
			}
			else{
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请输入购买金额")
					.ok('确定')
				);
			}
		}
		
		//查询加息券信息
		$scope.useRateClick = function() {
			if($scope.money != "" & $scope.money != null) {
				$scope.getRedpack(userId,2);
			}else{
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请输入购买金额")
					.ok('确定')
				);
			}
		}
		
		$scope.boxClose = function() {
			angular.element(".useRedPacketBg").hide();
		}
		//查询单个红包信息

		$scope.change2 = function(redPackage,typeId) {
			$scope.chengeitem = redPackage.id;
			if($scope.chengeitem!=0){
			$http.get(
				HOST_URL + "/user/" + userId + "/voucher/" + $scope.chengeitem + "?token=" + token).success(function(responseData) {
				if(responseData.resultCode == "0") {
					
					
					if(typeId=="0"){
						$scope.oneRedVoucher = responseData.resultData;
						$scope.oneRedVoucher.voucherValue = $scope.oneRedVoucher.voucherValue / 100;
					    $scope.useRedPacket=$scope.oneRedVoucher.voucherValue+"元";	
					    
					}
					else if(typeId=="2"){
						$scope.useRateVoucher = responseData.resultData;
						$scope.useRateVoucher.voucherValue = $scope.useRateVoucher.voucherValue / 10;
					    $scope.useRate=$scope.useRateVoucher.voucherValue+"%";
					    
					}
					 
					 angular.element(".useRedPacketBg").hide();

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
			else{
			$scope.oneRedVoucher.voucherValue =0;	
			}
		}
		//设置全投
		$scope.allMoney = function() {
			
			var balance = $scope.plan.amount - $scope.plan.nowSum;
			if(balance > $scope.UserInfo.money) {
				$scope.money = parseInt($scope.UserInfo.money / 100);
			} else {
				$scope.money = balance / 100;
			}
			//$scope.getRedpack(userId);
//			$scope.change();
		}
	
		$scope.beforePostInvestment = function(plan,useRateVoucher,oneRedVoucher) {
			var moneyData = $scope.money;
			var type = "^[0-9]*[1-9][0-9]*$";
			var r = new RegExp(type);
			var flag = r.test(moneyData);
			if(!flag) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('请输入正整数')
					.ok('确定')
				);
				return;
			}
			if($scope.money < (plan.minAmount / 100)) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('投资金额不能低于最小投资金额' + plan.minAmount / 100+"元")
					.ok('确定')
				);
				return;
			}
			if($scope.money > (plan.maxAmount / 100)) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('投资金额不能大于最高限额' + plan.maxAmount / 100+"元")
					.ok('确定')
				);
				return;
			}
			if($scope.UserInfo.hasCardId != true) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请先实名认证!")
					.ok('确定')
				).finally(function() {
					$location.path('mobile/user/userSafeCenter');
				});
				return;
			}
			var UserInfoMoney = $scope.UserInfo.money / 100;
			
			if($scope.money > UserInfoMoney + $scope.oneRedVoucher.voucherValue) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('可用余额不足，请充值')
					.ok('确定')
				).finally(function() {
					$location.path('mobile/user/userRecharge');
				});
				return;
			}
			if(plan.type != 1) {
				if($scope.money == null || $scope.money == '' || isNaN($scope.money) != false) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('温馨提示')
						.textContent("输入金额才能加入计划！")
						.ok('确定')
					);
					return;
				}
			}
			$rootScope.money = angular.copy($scope.money);
			

			$scope.isShow = true;

			
		};
		$scope.confirmBoxclose = function() {
			$scope.isShow = false;
		}
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		

		// 提交购买
		$scope.postInvestment = function(tradePassword, specialPlanPassword) {
			
			$rootScope.useRateVoucher=angular.copy($scope.useRateVoucher);
		    $rootScope.oneRedVoucher=angular.copy($scope.oneRedVoucher);
			var pocketId = parseInt($rootScope.oneRedVoucher.id);
			var raisingId = parseInt($rootScope.useRateVoucher.id);
			InvestmentService.newInvestment($routeParams.id, $rootScope.money,pocketId,raisingId, tradePassword, specialPlanPassword);
			$scope.isShow = false;
			$mdDialog.hide();
		}
	})

	.factory('InvestmentService', function($http, UserService, $mdDialog, $location, $route, userOnlineBankService2) {
		var plan;
		
		var investments;
		
		return {
			synPlan: function(planId) {
				return $http.get(HOST_URL + "/plan/" + planId).success(function(responseData) {

					if(responseData.resultCode == "0") {
						plan = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					//										console.log(plan);

				}).error(function() {

				});
			},
			getPlan: function() {
				return plan;
			},
			
			newInvestment: function(planId, money, pocketId,raisingId, tradePassword, specialPlanPassword) {
				var token = sessionStorage.token;
				var userId = sessionStorage.userId;
				var obj = this;

				return UserService.synUserAccount(userId, token).then(function() {
					var account = UserService.getUserAccount();
					obj.synPlan(planId);
					plan = obj.getPlan();
					var canInvestmentMoney = plan.amount - plan.nowSum;
					money *= 100;
					if(plan.type != 1) {
						if(money < plan.minAmount) {
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title('投资金额过低')
								.textContent('单笔投资金额必须大于￥' + plan.minAmount / 100 + '元')
								.ok('确定')
							);
							return;
						}
					}
					if(plan.maxAmount != 0 && money > plan.maxAmount) {
						$mdDialog.show(
							$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('投资金额过高')
							.textContent('单笔投资金额必须小于￥' + plan.maxAmount / 100 + '元')
							.ok('确定')
						);
						return;
					}
					if(money > canInvestmentMoney) {
						$mdDialog.show(
							$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('计划可投金额不足')
							.textContent('计划当前可投余额￥' + canInvestmentMoney / 100 + '元')
							.ok('确定')
						);
						return;
					}

					
					return obj.sendInvestment(planId, money, pocketId,raisingId, tradePassword, specialPlanPassword);
				});
			},
			sendInvestment: function(planId, money, pocketId, raisingId,tradePassword, specialPlanPassword) {
				var investment = {
					"planId": planId,
					"money": money,
					"pocketId": pocketId,
					"raisingId":raisingId,
					"specialPlanPassword": specialPlanPassword,
					"tradePassword": tradePassword,
					"token": sessionStorage.token,
					"userId": sessionStorage.userId
				};

				return $http.post(
					HOST_URL + "/plan/" + planId + "/join",
					$.param(investment), {
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
							$location.path('/mobile/user/index');
						});
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}

				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('失败')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			}
		}
	});