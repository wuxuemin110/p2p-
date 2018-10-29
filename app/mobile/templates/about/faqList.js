'use strict';

angular.module('myApp.faqList', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/faqList', {
            templateUrl: 'mobile/templates/about/faqList.html',
            controller: 'faqListCtrl'
        });
    }])

    .controller('faqListCtrl', function ($scope, redPackageService, $location) {
        $scope.riskData = {
			page: 0,
			limit:10,
		};	
		$scope.itemList=[];
//		$scope.noMore=true;
//		// 总页数  
//		$scope.totalPages = 1; 
		$scope.selectPage = function() {
//			if($scope.riskData.page < $scope.totalPages) {
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
			return redPackageService.selectPage("/help/list", data).then(function() {
					var tmpScope = redPackageService.getResult();
					
//					 for(var i = 0; i < $scope.tmpScope.itemList.length; i++) { 
//                       
//					$scope.itemList.push($scope.tmpScope.itemList[i]);
//					
//					}
					 $scope.itemList = tmpScope.itemList;
                    for(var i=0; i<$scope.itemList.length; i++){
						$scope.itemList[i].number=i+1;
						$scope.itemList[i].leftProblem="leftProblem"+(i+1);
						
					}
//					$scope.totalPages = $scope.tmpScope.totalPages;
				});
//				$scope.noMore=false;
//			}
//			else{
//				$scope.noMore=true;
//			}
			
		}
		
		 $scope.leftProblemFun=function(x){
        	var i=x.number-1
        	var className=angular.element(".faqList li").eq(i);
        	if(className.find("span").hasClass("showIcon")){
        		$scope.rightAnswer=x.number;
        	className.siblings().find("span").addClass("showIcon").removeClass("hideIcon");
        	className.find("span").addClass("hideIcon").removeClass("showIcon");
        	
        	}
        	else{
        		
        		$scope.rightAnswer=0;
        	className.find("span").addClass("showIcon").removeClass("hideIcon");
        	className.siblings().find("span").addClass("showIcon").removeClass("hideIcon");
        	
        	}	
        }
		 
		$scope.selectPage(); 
    });