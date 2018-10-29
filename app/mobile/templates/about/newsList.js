'use strict';

angular.module('myApp.newsList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/newsList', {
            templateUrl: 'mobile/templates/about/newsList.html',
            controller: 'newsListCtrl'
        });
    }])

    .controller('newsListCtrl', function ($scope, $location,redPackageService) {
        
         $scope.riskData = {
			page: 0,
			limit:10,
		};	
		$scope.itemList=[];
		$scope.noMore=true;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			
			if($scope.riskData.page < $scope.totalPages) {
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
			return redPackageService.selectPage("/news/list", data).then(function() {
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