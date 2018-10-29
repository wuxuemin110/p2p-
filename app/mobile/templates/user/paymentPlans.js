'use strict';

angular.module('myApp.paymentPlans', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/paymentPlans', {
			templateUrl: 'mobile/templates/user/paymentPlans.html',
			controller: 'paymentPlansCtrl'
		});
	}])

	.controller('paymentPlansCtrl', function($scope, $http, redPackageService, $location, $filter, userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};
		// 检测登录
		$scope.queryData = {};
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = loginUrl;
			return 0;
		}

		//累计资金数据  
		$scope.totalDataFun = function() {
			return $http.get(
				HOST_URL + "user/" + userId + "/totalData?token=" + token).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.totalData = responseData.resultData;

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
		$scope.totalDataFun();
		//查询回款计划      

		$scope.redIndex = 1;

		$scope.riskData = {
			token: token,
			page: 0,
			limit: 10,
			status: 1,
			startDate: "",
			endDate: ""
		};
		$scope.itemList = [];
		$scope.noMore = true;
		// 总页数  
		$scope.totalPages = 1;
		$scope.selectPage = function() {
			if($scope.riskData.page < $scope.totalPages) {
				$scope.noMore = false;
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
				return redPackageService.selectPage("/user/" + userId + "/repays", data).then(function() {
					$scope.tmpScope = redPackageService.getResult();
					for(var i = 0; i < $scope.tmpScope.itemList.length; i++) {

						$scope.itemList.push($scope.tmpScope.itemList[i]);

					}

					$scope.totalPages = $scope.tmpScope.totalPages;
				});

			} else {
				$scope.noMore = true;
			}
		}
		$scope.selectPage();
		
		$scope.riskData1 = {
			token: token,
			page: 0,
			limit: 10,
			status: 2,
			startDate: "",
			endDate: ""
		};
		$scope.itemList1 = [];
		$scope.noMore1 = true;
		// 总页数  
		$scope.totalPages1 = 1;
		$scope.selectPage1 = function() {
			if($scope.riskData1.page < $scope.totalPages1) {
				$scope.noMore1 = false;
				$scope.riskData1.page++;
				var data = angular.copy($scope.riskData1);
				return redPackageService.selectPage("/user/" + userId + "/repays", data).then(function() {
					$scope.tmpScope1 = redPackageService.getResult();
					for(var i = 0; i < $scope.tmpScope1.itemList.length; i++) {

						$scope.itemList1.push($scope.tmpScope1.itemList[i]);

					}

					$scope.totalPages1 = $scope.tmpScope1.totalPages;
				});

			} else {
				$scope.noMore1 = true;
			}
		}
		$scope.selectPage1();

	})