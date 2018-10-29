'use strict';

angular.module('myApp.activityCenter', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/activityCenter', {
			templateUrl: 'mobile/templates/index/activityCenter.html',
			controller: 'activityCenter'
		});
	}])
	.controller('activityCenter', function($scope,redPackageService, $timeout,userOnlineBankService2) {
		
		$scope.riskData = {
			page: 0,
			limit: 3,
			type: "index_mobile",
		};	
		$scope.itemList=[];
		$scope.noMore=false;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			if($scope.riskData.page < $scope.totalPages) {
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
			return redPackageService.selectPage("/activity/pic/list", data).then(function() {
					$scope.tmpScope = redPackageService.getResult();
					
					 for(var i = 0; i < $scope.tmpScope.itemList.length; i++) { 
                         
					$scope.itemList.push($scope.tmpScope.itemList[i]);
					}

					$scope.totalPages = $scope.tmpScope.totalPages;
				});
			}
			else{
				$scope.noMore=true;
			}
		}

		$scope.selectPage();
	});