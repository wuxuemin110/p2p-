'use strict';

angular.module('myApp.planList', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/planList', {
			templateUrl: 'mobile/templates/index/planList.html',
			controller: 'planListCtrl'
		});
	}])
	.controller('planListCtrl', function($scope, planListService, $timeout, userOnlineBankService2) {
		$scope.session1 = '';
		$scope.tidText = '请输入密码';
		$scope.liIndex = 1;
		$scope.currentLi = 2;
		// 当前页数  
		$scope.currentPage = 0;
		$scope.bottomPlans=[];
		$scope.noMore=true;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			var limit = 10;
			if($scope.currentPage < $scope.totalPages) {
				$scope.noMore=false;
				$scope.currentPage++;
				var page = $scope.currentPage;
				planListService.synBottomPlans(page, limit).then(function() {
					$scope.tmpScope = planListService.getBottomPlans();
					 for(var i = 0; i < $scope.tmpScope.bottomPlans.length; i++) { 
					$scope.bottomPlans.push($scope.tmpScope.bottomPlans[i]);
					}

					$scope.totalPages = $scope.tmpScope.totalPages;
					if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
						//WOW.js

						new WOW().init();
					};
				});
				
			}
			else{
				$scope.noMore=true;
			}
		}

		
		$scope.selectPage();
	})

	.factory('planListService', function($http, userOnlineBankService2) {
		var mainPlanList;
		var bottomPlanList;
		var tmpScope = {};
		var rankingList;
		var Total;
		return {

			getBottomPlans: function() {
				return tmpScope;
			},

			// 同步历史计划
			synBottomPlans: function(page, limit) {

				var typeData = "";

				return $http.get(HOST_URL + "/plans?order=desc&limit=" + limit + "&page=" + page + typeData).success(function(responseData) {

					if(responseData.resultCode == "0") {
						bottomPlanList = responseData.resultData;

					}

					tmpScope.bottomPlans = bottomPlanList;
					if(bottomPlanList == "") {
						tmpScope.totalPages = 0
					} else {
						tmpScope.totalPages = Math.ceil(responseData.sumCount / limit);
					}

				}).error(function() {
					// 无响应
				});
			},

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