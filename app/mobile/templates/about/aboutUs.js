'use strict';

angular.module('myApp.aboutUs', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/aboutUs', {
            templateUrl: 'mobile/templates/about/aboutUs.html',
            controller: 'aboutUsCtrl'
        });
    }])

    .controller('aboutUsCtrl', function ($scope, $location,redPackageService,userOnlineBankService2) {
    	$scope.currentLi=3;
    	//查询投资人数
		$scope.riskData = {
			page: 0,
			limit: 5,
			type: "index_mobile",
		};
		  	//查询新闻
		$scope.cData = {
			page: 0,
			limit: 4,
//			type: "index_mobile",
		};	
		$scope.itemList=[];
		$scope.newsList=[]
		$scope.noMore=false;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			
				$scope.cData.page++;
				var data = angular.copy($scope.riskData);
//			return 
			redPackageService.selectPage("/activity/pic/list", data).then(function() {
					$scope.tmpScope = redPackageService.getResult();
					
					 for(var i = 0; i < $scope.tmpScope.itemList.length; i++) { 
                         
					$scope.itemList.push($scope.tmpScope.itemList[i]);
					}

				
			}); 
			
				redPackageService.selectPage("news/list", $scope.cData).then(function() {
					var data=redPackageService.getResult();
					$scope.totalPages = data.totalPages;
					angular.forEach(data.itemList,function(da,index){
						$scope.newsList.push(da)
					})
					
					console.log(data)
					if($scope.cData.page < $scope.totalPages) {
						$scope.noMore=false;
						}
			         else{
				$scope.noMore=true;
			           }
				});
		
			
		}

		$scope.selectPage();
    })
//  .factory('AboutService', function ($http) {
//     
//      return {
//         
//      }
//  });
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
//                  scope.$apply(attr.whenScrolled);
                    forbid = true;
                    setTimeout(function(){
                        forbid = false;
                    },500)
                }
            }
        });
    };
});