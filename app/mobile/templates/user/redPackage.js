'use strict';

angular.module('myApp.redPackage', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/user/redPackage', {
			templateUrl: 'mobile/templates/user/redPackage.html',
			controller: 'redPackageCtrl'
		});
	}])

	.controller('redPackageCtrl', function($scope, redPackageService, $http, $location, userOnlineBankService2) {
		
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
				type: 0,
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
				type: 0,
				status: 2
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
				type: 0,
				status: 1
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
	.factory('redPackageService', function($http, $mdDialog,userOnlineBankService2) {
		var totalCount;
		var tmpObj = {};
		return {
			selectPage: function(url, data) {

				var url_data = "?";

				function isType(obj, type) {
					return Object.prototype.toString.call(obj) === "[object " + type + "]";
				}
				for(var item in data) {
					if(isType(data[item], "Object")) {
						if(item == "keyword") {
							url_data += "keyword=&";
						}
						for(var ite in data[item]) {
							// 如果是二层数组，key是value，value是key
							url_data += data[item][ite] + "=" + ite + "&";
						}
					} else {
						url_data += item + "=" + data[item] + "&";
					}
				}
				//                var promiseA
				//                = $http.get(HOST_URL + urlForCount + url_data).success(function (responseData) {
				//           	console.log(urlForCount, url_data);
				//                    totalCount = responseData.total;
				//                });

				//            return promiseA.then(function () {
				return $http.get(HOST_URL + url + url_data, data).success(function(responseData) {

					if(responseData.resultCode == "0") {
						var items = responseData.resultData;
						var eachPages = data.limit;
						var totalPage = Math.ceil(responseData.sumCount / data.limit);
						var page = data.page;
						tmpObj.sumCount = responseData.sumCount;
						tmpObj.totalPages = totalPage;
						tmpObj.itemList = [];
						if(page <= 1) {
							page = 1;
						}

						if(page >= totalPage) {
							page = totalPage;
						}
						for(var i = 0; i < items.length; i++) {
							tmpObj.itemList.push(items[i]);
						}
						tmpObj.startIndex = (page - 1) * eachPages + 1;
						tmpObj.nowPage = page;
						tmpObj.pages = [];
						if(tmpObj.nowPage > 3 && tmpObj.totalPages > 7) {
							if(tmpObj.nowPage + 3 < tmpObj.totalPages) {
								for(var i = 0; i < 7; i++) {
									tmpObj.pages[i] = {};
									tmpObj.pages[i].showNumber = tmpObj.nowPage - 3 + i;
									tmpObj.isShowDot = true;
								}
							} else if(tmpObj.nowPage + 3 >= tmpObj.totalPages) {
								for(var i = 6; i >= 0; i--) {
									tmpObj.pages[6 - i] = {};
									tmpObj.pages[6 - i].showNumber = tmpObj.totalPages - i;
									tmpObj.isShowDot = false;
								}
							}
						} else if(tmpObj.nowPage <= 3 && tmpObj.totalPages > 8) {
							for(var i = 0; i <= 6; i++) {
								tmpObj.pages[i] = {};
								tmpObj.pages[i].showNumber = i + 1;
								tmpObj.isShowDot = true;
							}
						} else {
							for(var i = 0; i < tmpObj.totalPages; i++) {
								tmpObj.pages[i] = {};
								tmpObj.pages[i].showNumber = i + 1;
								tmpObj.isShowDot = false;
							}
						}
						return tmpObj;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
					//                      console.log(responseData);

				});
				//            });
			},
			getResult: function() {
				return tmpObj;
			}
		}
	}).directive('redPackScroll0', function() {
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
                    scope.$apply(attr.redPackScroll0);
                    forbid = true;
                    setTimeout(function(){
                        forbid = false;
                    },500)
                }
            }
        });
    };
})
	.directive('redPackScroll1', function() {
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
                    scope.$apply(attr.redPackScroll1);
                    forbid = true;
                    setTimeout(function(){
                        forbid = false;
                    },500)
                }
            }
        });
    };
}).directive('redPackScroll2', function() {
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
                    scope.$apply(attr.redPackScroll2);
                    forbid = true;
                    setTimeout(function(){
                        forbid = false;
                    },500)
                }
            }
        });
    };
});  