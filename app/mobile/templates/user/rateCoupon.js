'use strict';

angular.module('myApp.rateCoupon', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/rateCoupon', {
			templateUrl: 'mobile/templates/user/rateCoupon.html',
			controller: 'rateCouponCtrl'
		});
	}])

	.controller('rateCouponCtrl', function($scope, redPackageService, $http, $location, userOnlineBankService2) {
		
		var userId = sessionStorage.getItem("userId");
		var token = sessionStorage.getItem("token");
		if(token == undefined) {
			alert("您尚未登录！");
			self.location = loginUrl;
			return 0;
		} else {
		
		$scope.redIndex=1;
			//获取未使用红包
		     $scope.riskData = {
				token: token,
				page: 0,
				limit: 10,
				type: 2,
				status: 0
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
					return redPackageService.selectPage("/user/" + userId + "/account/vouchers", data).then(function() {
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
				type: 2,
				status: 1
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
					
					return redPackageService.selectPage("/user/" + userId + "/account/vouchers", data).then(function() {
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
        
        
        $scope.riskData2 = {
				token: token,
				page: 0,
				limit: 10,
				type: 2,
				status: 2
			};
			$scope.itemList2 = [];
			$scope.noMore2 = true;
			// 总页数  
			$scope.totalPages2 = 1;
        
        $scope.selectPage2 = function() {
				if($scope.riskData2.page < $scope.totalPages2) {
					$scope.noMore2 = false;
					$scope.riskData2.page++;
					var data = angular.copy($scope.riskData2);
					return redPackageService.selectPage("/user/" + userId + "/account/vouchers", data).then(function() {
						$scope.tmpScope2 = redPackageService.getResult();
						for(var i = 0; i < $scope.tmpScope2.itemList.length; i++) {

							$scope.itemList2.push($scope.tmpScope2.itemList[i]);
							
						}
						$scope.totalPages2 = $scope.tmpScope2.totalPages;

					});
					
				} else {
					$scope.noMore2 = true;
				}
			}
        $scope.selectPage2();
			
	     }
	})