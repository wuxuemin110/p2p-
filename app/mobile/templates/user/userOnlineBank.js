'use strict';

angular.module('myApp.userOnlineBank', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/user/userOnlineBank', {
            templateUrl: 'mobile/templates/user/userOnlineBank.html',
            controller: 'userOnlineBankCtrl'
        });
    }])

    .controller('userOnlineBankCtrl', function ($scope, $mdDialog, $mdMedia, userOnlineBankService,userOnlineBankService2, UserWithdrawService,UserService,$http) {
        $scope.tradeRecord = {};
        $scope.userAccount = {};
        $scope.role = sessionStorage.role;
        $scope.payMode = 'huichao';
        // 检测登录
        var userId = sessionStorage.userId;
        var token = sessionStorage.token;
         //获取用户信息
        if (token == undefined) {
            alert("您尚未登录！");
            self.location = "/login";
            return 0;
        } else {
            // 获取账户信息
            	$scope.getUserInfo = function() {
			$http.get(
				HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.UserInfo = responseData.resultData;
					
				}
				else{
					userOnlineBankService2.alertInfo(responseData);
				}

				 if($scope.UserInfo.hasCardId != true) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请先实名认证!")
					.ok('确定')
				).finally(function() {
					$location.path('/user/userSafeCenter');
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
					$location.path('/user/userBankCard');
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
					$location.path('/user/userSafeCenter');
				});
                return;
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
            UserService.synUserAccount(userId, token).then(function () {
                $scope.userAccount = UserService.getUserAccount();
            });
           

        }
        // 获取银行卡信息
			UserWithdrawService.synUserCard(userId, token).then(function() {
				$scope.userCard = UserWithdrawService.getUserCard();
				
				
			});
         
        //
        $scope.userRecharge1 = "ddhover";
        $scope.recharge = function () {

         	 var moneyData=$scope.tradeRecord.money;
//      	  console.log(moneyData);
			var type=/^[1-9]*[1-9][0-9]*$/; 
			var flag=type.test(moneyData);
//			console.log(flag);
			if(!flag){
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('充值金额错误')
					.textContent('充值金额必须为整数！')
					.ok('确定')
				);
				return;
			}
			if(moneyData<100){
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('充值金额错误')
					.textContent('输入金额不能少于100元')
					.ok('确定')
				);
				return;
			}
			if(moneyData>2000000){
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('充值金额错误')
					.textContent('输入金额过大，请重新输入')
					.ok('确定')
				);
				return;
			}
			
			 if($scope.tradeRecord.tradePassword == "" || $scope.tradeRecord.tradePassword == undefined || $scope.tradeRecord.tradePassword == null) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('温馨提示')
					.textContent("支付密码不能为空")
					.ok('确定')
				);
				return;
			}
            var tradeRecordData = angular.copy($scope.tradeRecord);


             tradeRecordData.money = (tradeRecordData.money ) * 100;
             tradeRecordData.bankCode = "0000000000";


            userOnlineBankService.synRecharge(userId, token, tradeRecordData).then(function () {
                $scope.payBody = userOnlineBankService.getRechargeData();
                	if($scope.payBody != undefined &&$scope.payBody!= false){
					 var ua = navigator.userAgent.toLowerCase();　　
					var isWeixin = ua.indexOf('micromessenger') != -1;　　
					if(isWeixin) {
						angular.element('#WeChatModel').modal('show');　　
					} else {　　
						angular.element('#huichaoModal').modal('show');　　
					}			
				}
              

            });
        };
        $scope.showModal = function () {
            angular.element('#huichaoModal').modal('hide');
            angular.element('#shengfutongModal').modal('hide');
            angular.element('#WeChatModel').modal('hide');
//          angular.element('#myModal').modal('show');
        };
    })
    .factory('userOnlineBankService', function ($http, $mdDialog,userOnlineBankService2) {
        var rechargeData;
        return {
            getRechargeData: function () {
                return rechargeData;
            },
            synRecharge: function (userId, token, tradeRecord) {
            	tradeRecord.token=token;
                return $http.post(
                    HOST_URL + "/user/"+userId+"/account/recharge/union" ,
                    $.param(tradeRecord),
                   {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).success(function (responseData) {
                   if(responseData.resultCode=="0"){
                   	rechargeData = responseData.resultData;
                	}
                   else{	
                   	 userOnlineBankService2.alertInfo(responseData);
                   }
                }).error(function (responseData) {
                    rechargeData = {
                        signInfo: false
                    };
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('提示')
                            .textContent(responseData.resultMsg)
                            .ok('确定')
                    );
                });
            },
            alertInfo: function (responseData) {
//          	console.log(responseData);
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('提示')
                        .textContent(responseData.resultMsg)
                        .ok('确定')
                );
            }
        };
    }).factory('userOnlineBankService2', function ($http, $mdDialog) {
        //统一返回错误提示
        return {
            alertInfo: function (responseData) {
            	if(responseData.resultCode=='1'){
            		$mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('提示')
                        .textContent(responseData.resultMsg)
                        .ok('确定')
                );
                return;
            	}
            	else if(responseData.resultCode=='2'){
            		sessionStorage.clear();
                    self.location = "/login";
                    return;
            	}
               
            }
        };
    });