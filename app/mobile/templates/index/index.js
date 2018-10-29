'use strict';

angular.module('myApp.index', ['ngRoute', 'radialIndicator'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/index', {
			templateUrl: 'mobile/templates/index/index.html',
			controller: 'IndexCtrl'
		});
	}])

	.controller('IndexCtrl', function($location, $scope, $rootScope, IndexService, $timeout, $http, $mdDialog, radialIndicatorInstance) {
		//富爸爸

		var dataDpr = $(".no-js").attr("data-dpr");
		var dataWidth = $(window).width();
		$scope.indicatorOption = {
			radius: 118,
			percentage: true,
			displayNumber: false, //设置是否显示数字指示的进度
			barBgColor: "#EE6C77",
			barColor: "#e20214",
			minValue: 0,
			maxValue: 100,
			initValue: $scope.numbers,
			barWidth: 6,
		};
		if(dataDpr == 1 && dataWidth < 390) {
			$scope.indicatorOption = {
				radius: 59,
				percentage: true,
				displayNumber: false, //设置是否显示数字指示的进度
				barBgColor: "#EE6C77",
				barColor: "#e20214",
				minValue: 0,
				maxValue: 100,
				initValue: $scope.numbers,
				barWidth: 3,
			};
		}
		if(dataDpr == 1 && dataWidth > 390) {
			$scope.indicatorOption = {
				radius: 80,
				percentage: true,
				displayNumber: false, //设置是否显示数字指示的进度
				barBgColor: "#EE6C77",
				barColor: "#e20214",
				minValue: 0,
				maxValue: 100,
				initValue: $scope.numbers,
				barWidth: 4,
			};
		}
		
		if(dataDpr == 3 && dataWidth > 390) {
			$scope.indicatorOption = {
				radius: 180,
				percentage: true,
				displayNumber: false, //设置是否显示数字指示的进度
				barBgColor: "#EE6C77",
				barColor: "#e20214",
				minValue: 0,
				maxValue: 100,
				initValue: $scope.numbers,
				barWidth: 8,
			};
		}
		$scope.currentLi = 1; //当前所在页面标志	
		$scope.bottomPlans = '';
		$scope.session1 = ''

		if($location.search().utm_source) {
			localStorage.utm_source = $location.search().utm_source;
			localStorage.uid = $location.search().uid;
		}
		//获取滑动图片
		IndexService.Picture().success(function() {
			$scope.IndexImag = IndexService.getPicture();
			for(var i = 0; i < $scope.IndexImag.length; i++) {
				$scope.IndexImag[i].number = i;
			}

		});

		$scope.$on('ngRepeatFinished2', function(ngRepeatFinishedEvent) {

			$(".main_visual").hover(function() {
				$("#btn_prev,#btn_next").fadeIn()
			}, function() {
				$("#btn_prev,#btn_next").fadeOut()
			});

			var $dragBln = false;

			$(".main_image").touchSlider({
				flexible: true,
				speed: 200,
				btn_prev: $("#btn_prev"),
				btn_next: $("#btn_next"),
				paging: $(".flicking_con a"),
				counter: function(e) {
					$(".flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
				}
			});

			$(".main_image").bind("mousedown", function() {
				$dragBln = false;
			});

			$(".main_image").bind("dragstart", function() {
				$dragBln = true;
			});

			$(".main_image a").click(function() {
				if($dragBln) {
					return false;
				}
			});
           if($(".slides_container li").length>1){
			var timer = setInterval(function() {
				$("#btn_next").click();
			}, 5000);
            }
			$(".main_visual").hover(function() {
				clearInterval(timer);
			}, function() {
				timer = setInterval(function() {
					$("#btn_next").click();
				}, 5000);
			});

			$(".main_image").bind("touchstart", function() {
				clearInterval(timer);
			}).bind("touchend", function() {
				timer = setInterval(function() {
					$("#btn_next").click();
				}, 5000);
			});

		});
		//获取计划列表
		$scope.getList = function() {
			$http.get(HOST_URL + "/plan/notnew?order=desc&limit=6&page=" + 1).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.bottomPlans1 = responseData.resultData
				}

				if(!(/msie [6|7|8|9]/i.test(navigator.userAgent))) {
					//WOW.js

					new WOW().init();
				};

			}).error(function() {
				//				$mdDialog.show(
				//					$mdDialog.alert()
				//					.clickOutsideToClose(true)
				//					.title('提示')
				//					.textContent('获取计划列表时发生错误，请刷新重试，若多次刷新无效，请联系客服解决。')
				//					.ok('确定')
				//				);
			})
		};
        $scope.getList();
		$scope.plans = {};
		//获取体验计划,这个后来改为新手标
		$scope.getExPlan = function() {

			$http.get(HOST_URL + "/plans?order=desc&type=" + 1 + "&limit=" + 1).success(function(responseData) {
				//				console.log(responseData);
				if(responseData.resultCode == "0") {
					$scope.plans = responseData.resultData;
//					console.log($scope.plans)
				}
				var a = (($scope.plans[0]['nowSum'] / $scope.plans[0]['amount']) * 100) > 100 ? 100 : ($scope.plans[0]['nowSum'] / $scope.plans[0]['amount'] * 100);
				//新手专享插入圆圈数据
				// /radialIndicatorInstance['indicator1'].animate(a);
				if(a > 84 && a < 100) { //设置显示满标奖励
					$scope.newFullPrize = 1;
					//					$scope.plans[0].text="满奖10元";
				}
				if($scope.plans[0]['nowSum'] == 0) { //设置首投奖
					$scope.newFullPrize = 2;
					$scope.plans[0].text = "首投奖5元";
				}

			}).error(function(responseData) {

			})
		};
		
		//获取平台公告
		$scope.getNotice = function() {
			$http.get(HOST_URL + "/notice/list?limit=7&page=" + 1
				//			 {},
				//              {
				//                  headers: {
				//                      'Content-Type': 'application/json'
				//                  }
				//              }
			).success(function(responseData) {
				//				console.log(responseData);
				if(responseData.resultCode == "0") {
					$scope.noticeList = responseData.resultData;
				}

			}).error(function() {
				
			})
		};

		$scope.getNotice();
		$scope.getExPlan();


	})

	.factory('IndexService', function($http, $mdDialog) {
		//var plans;
		//var itemList;
		var ListObject = {};
		var eachPages;
		var picture;
		return {
			getPicture: function() {
				return picture;
			},
			Picture: function() {
				return $http.get(HOST_URL + "/banner/list?type=index_mobile", {
					cache: true
				}).success(function(responseData) {
					if(responseData.resultCode == "0") {
						picture = responseData.resultData;
					}
				}).error(function(responseData) {
					//					$mdDialog.show(
					//						$mdDialog.alert()
					//						.clickOutsideToClose(true)
					//						.title('提示')
					//						.textContent('获取计划列表时发生错误，请刷新重试，若多次刷新无效，请联系客服解决。')
					//						.ok('确定')
					//					);
				});
			},
			selectPages: function(page, items, eachPageCount) {
				if(eachPageCount != null) {
					eachPages = eachPageCount;
				} else {
					eachPages = 5;
				}
				var totalPage = Math.ceil(items.length / eachPages);
				ListObject.totalPages = totalPage;
				ListObject.itemList = [];
				var limit;
				if(page <= 1) {
					page = 1;
				}

				if(page >= totalPage && totalPage > 0) {
					page = totalPage;
				}

				if(page == totalPage || items.length == 0) {
					limit = items.length;
				} else {
					limit = page * eachPages;
				}
				for(var loopI = (page - 1) * eachPages; loopI < limit; loopI++) {
					items[loopI].indexId = loopI + 1;
					ListObject.itemList.push(items[loopI]);
				}
				ListObject.startIndex = (page - 1) * eachPages + 1;
				ListObject.nowPage = page;

				ListObject.pages = [];

				if(ListObject.nowPage > 3 && ListObject.totalPages > 7) {
					if(ListObject.nowPage + 3 < ListObject.totalPages) {
						for(var i = 0; i < 7; i++) {
							ListObject.pages[i] = {};
							ListObject.pages[i].showNumber = ListObject.nowPage - 3 + i;
							ListObject.isShowDot = true;
						}
					} else if(ListObject.nowPage + 3 >= ListObject.totalPages) {
						for(var i = 6; i >= 0; i--) {
							ListObject.pages[6 - i] = {};
							ListObject.pages[6 - i].showNumber = ListObject.totalPages - i;
							ListObject.isShowDot = false;
						}
					}
				} else if(ListObject.nowPage <= 3 && ListObject.totalPages > 8) {
					for(var i = 0; i <= 6; i++) {
						ListObject.pages[i] = {};
						ListObject.pages[i].showNumber = i + 1;
						ListObject.isShowDot = true;
					}
				} else {
					for(var i = 0; i < ListObject.totalPages; i++) {
						ListObject.pages[i] = {};
						ListObject.pages[i].showNumber = i + 1;
						ListObject.isShowDot = false;
					}
				}
				return ListObject;
			}
		}
	}).directive('onFinishRenderFilters2', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if(scope.$last === true) {
					$timeout(function() {
						scope.$emit('ngRepeatFinished2');
					});
				}
			}
		}
	});