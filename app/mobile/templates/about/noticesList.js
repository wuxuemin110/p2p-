'use strict';

angular.module('myApp.noticesList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/noticesList', {
            templateUrl: 'mobile/templates/about/noticesList.html',
            controller: 'noticesListCtrl'
        });
    }])

    .controller('noticesListCtrl', function ($scope, redPackageService, $location) {
        $scope.riskData = {
			page: 0,
			limit:20,
		};	
		$scope.itemList=[];
		$scope.noMore=true;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			if($scope.riskData.page < $scope.totalPages) {
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
			return redPackageService.selectPage("/notice/list", data).then(function() {
					$scope.tmpScope = redPackageService.getResult();
					
					 for(var i = 0; i < $scope.tmpScope.itemList.length; i++) { 
                         
					$scope.itemList.push($scope.tmpScope.itemList[i]);
					}

					$scope.totalPages = $scope.tmpScope.totalPages;
				});
				$scope.noMore=false;
			}
			else{
				$scope.noMore=true;
			}
			
		}
		$scope.selectPage(); 
    })
    .directive('whenScrolled', function() {
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