'use strict';

angular.module('myApp.InvestmentRecords', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/InvestmentRecords', {
			templateUrl: 'mobile/templates/user/InvestmentRecords.html',
			controller: 'InvestmentRecordsCtrl'
		});
	}])

	.controller('InvestmentRecordsCtrl', function($scope, InvestmentRecordsService, redPackageService, $http, $location, $filter, userOnlineBankService2) {
		$scope.tradeRecord = {};
		$scope.userAccount = {};

		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		// 检测登录
		if(token == undefined) {
			alert("您尚未登录！");
			self.location =loginUrl;
			return 0;
		} else {

			//查询投资人数
			$scope.riskData = {
				page: 0,
				limit: 12,
				token: token
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
					return redPackageService.selectPage("/user/" + userId + "/investments", data).then(function() {
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
		}
	})

	.factory('InvestmentRecordsService', function($http, $mdDialog) {

		return {

		}
	}).directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // body窗口的滚动加载--需要Jquery
        var forbid = false;
        $(window).scroll(function () {
            //滚动条距离顶部的距离
            var scrollTop = $(window).scrollTop();
            //滚动条的高度
            var scrollHeight = $(document).height();
            //窗口的高度
            var windowHeight = $(window).height();
            if (scrollTop + windowHeight >=scrollHeight) {
                if(!forbid){
                    scope.$apply(attr.whenScrolled);
                    forbid = true;
                    setTimeout(function(){
                        forbid = false;
                    },500)
                }
            }
        });
    };
});