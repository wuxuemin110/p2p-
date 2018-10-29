'use strict';

angular.module('myApp.join', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/join/:id', {
			templateUrl: 'mobile/templates/index/join.html',
			controller: 'JoinCtrl'
		});
	}])

	.controller('JoinCtrl', function($scope, $rootScope, $routeParams, $mdDialog, $mdMedia, JoinService, $location, $http,$compile,redPackageService, userOnlineBankService2) {
		var userId = sessionStorage.userId;
		var token = sessionStorage.token;
		$scope.activeTap = 0;
		$scope.isShow = false;
		$scope.money = "";
		$scope.loans = [];
		$scope.loanPages = [];
		$scope.investments = [];
		$scope.investmentPages = [];
		$scope.showImg = false;
		$scope.rightShow = 1;
		$scope.UserInfo = {};
		$scope.fullImgUrl = '';
		$scope.carLoan = {};
		$scope.descriptionType ="app";
        $scope.guaranteeInfoType ="app";

		$scope.password = '';

	

		// 判断登录
		if(token == undefined) {

			$scope.rightShow = 1;
			//			              $mdDialog.show(
			//			                  $mdDialog.alert()
			//			                      .clickOutsideToClose(true)
			//			                      .title('请先登录')
			//			                      .ok('确定')
			//			              ).finally(function () {
			//			                  $location.path('/login');
			//			              });
			//			              return;
		} else {

			$scope.rightShow = 2;
			$scope.getUserInfo = function() {

				$http.get(
					HOST_URL + "user/" + userId + "/userInfo?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {
						$scope.UserInfo = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);

				});
			};
			$scope.getUserInfo();

		};

		$scope.synPlan = function() {
			window.scrollTo(0, 0);

			JoinService.synPlan($routeParams.id).then(function() {

				$scope.plan = JoinService.getPlan();
				
				
			    
                    var compileFn=$compile(  
                        $scope.plan.description  
                    );  
                    var $dom=compileFn($scope);  
                    $dom.appendTo(document.getElementsByClassName('planDescription'));
                  //第三方担保代码  
                var guaranteeFn=$compile(  
                        $scope.plan.guaranteeInfo  
                    );  
                    var $dom2=guaranteeFn($scope);  
                    $dom2.appendTo(document.getElementsByClassName('guaranteeInfo'));

			});
		};
		$scope.synPlan();
		
		
		//第三方担保代码图片点击放大
        $scope.changePic = function($event) {
			var img = $event.srcElement || $event.target;
			angular.element("#img1")[0].src = img.src;

			angular.element(".imgGrayBg")[0].style.display = "block";
		}
		$scope.closePic = function() {

			angular.element(".imgGrayBg")[0].style.display = "none";

		}
		
		//相关资料
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			
			var l = $("#bigImageBg").find("ul li").length;
			$("#details_banner li").click(function() {
				var index = $(this).index();
				$("#bigImageBg").show();
				$("#bigImageBg li:eq(" + index + ")").addClass("imgShow").siblings().removeClass("imgShow");
				//$(".img-responsive").attr("src", src);

			})

			$(".bigLeft").click(function() {

				var i;
				$("#bigImageBg").find("ul li").each(function(index) {
					if($(this).hasClass("imgShow")) {
						i = index
					}
				});
				i--;
				if(i < 0) {
					i = l - 1
				}
				$("#bigImageBg").find("ul li").eq(i).addClass("imgShow").siblings().removeClass("imgShow");
			});
			$(".bigRight").click(function() {
				var i;
				$("#bigImageBg").find("ul li").each(function(index) {
					if($(this).hasClass("imgShow")) {
						i = index;

					}
				});
				i++;
				if(i > l - 1) {
					i = 0
				}
				$("#bigImageBg").find("ul li").eq(i).addClass("imgShow").siblings().removeClass("imgShow");

			});
			$(".closeImg").click(function() {
				$("#bigImageBg").hide();
			});
			 $('p img').click(function(){
    	var img=$(this).attr("src");
    	$('#img1').attr("src",img);
    	$(".imgGrayBg").show();
    });
    $(".closeImgBg").click(function(){
    	$(".imgGrayBg").hide();
    });
		});
		
		//查询投资人数
		$scope.riskData = {
			page: 0,
			limit: 15,
		};	
		$scope.itemList=[];
		$scope.noMore=true;
		// 总页数  
		$scope.totalPages = 1; 
		$scope.selectPage = function() {
			if($scope.riskData.page < $scope.totalPages) {
				$scope.noMore=false;
				$scope.riskData.page++;
				var data = angular.copy($scope.riskData);
			return redPackageService.selectPage("/plan/" + $routeParams.id + "/investments", data).then(function() {
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
		
		
		$scope.getRedpack = function(userId) {
			return $http.get(
					HOST_URL + "/user/" + userId + "/account/canusevouchers?token=" + token + "&type=0&amount=" + $scope.money + "&cycle=" + $scope.plan.staging)
				.success(function(responseData) {

					if(responseData.resultCode == "0") {
						$scope.redVouchers = responseData.resultData;
					} else {
						userOnlineBankService2.alertInfo(responseData);
					}
				}).error(function(responseData) {

					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
		};

		//查询红包信息
		$scope.change = function() {
			if($scope.money != "" & $scope.money != null) {
				$scope.selectedItem="0";
				$scope.oneRedVoucher="";
				$scope.getRedpack(userId);
			}
		}
		//查询单个红包信息

		$scope.change2 = function() {
			$scope.chengeitem = $scope.selectedItem;
			$http.get(
				HOST_URL + "/user/" + userId + "/voucher/" + $scope.chengeitem + "?token=" + token).success(function(responseData) {
				if(responseData.resultCode == "0") {
					$scope.oneRedVoucher = responseData.resultData;
					$scope.oneRedVoucher.voucherValue = $scope.oneRedVoucher.voucherValue / 100;
				} else {
					userOnlineBankService2.alertInfo(responseData);
				}

			}).error(function(responseData) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent(responseData['resultMsg'])
					.ok('确定')
				);

			});
		}
		//设置全投
		$scope.allMoney = function() {
			//			console.log($scope.UserInfo.money);
			var balance = $scope.plan.amount - $scope.plan.nowSum;
			if(balance > $scope.UserInfo.money) {
				$scope.money = parseInt($scope.UserInfo.money / 100);
			} else {
				$scope.money = balance / 100;
			}
			$scope.getRedpack(userId);
		}

		$scope.selectInvestmentsPages = function(pages) {
			if(pages >= $scope.investmentPages.length) {
				pages = $scope.investmentPages.length;
			} else if(pages <= 1) {
				pages = 1;
			}

			$scope.investments = JoinService.selectInvestments(pages);
			$scope.nowInvestmentPage = pages;
		};
		$scope.nowLoanPage = 1;
		$scope.nowInvestmentPage = 1;
		// 加载券
		$scope.vouchers = {};
		$scope.vouchersAll = {};
		$scope.vouchers.pocket_money = {};
		$scope.vouchers.exp_money = {};
		$scope.vouchers.raising_rates = {};
		

		
		$scope.beforePostInvestment = function(plan, selectedItem) {
			var moneyData = $scope.money;
			var type = "^[0-9]*[1-9][0-9]*$";
			var r = new RegExp(type);
			var flag = r.test(moneyData);
			if(!flag) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('请输入正整数')
					.ok('确定')
				);
				return;
			}
			if($scope.money < (plan.minAmount / 100)) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('投资金额必须为大于' + plan.minAmount / 100)
					.ok('确定')
				);
				return;
			}
			if($scope.UserInfo.hasCardId != true) {

				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent("请先实名认证!")
					.ok('确定')
				).finally(function() {
					$location.path('/user/userSafeCenter');
				});
				return;
			}
			var UserInfoMoney = $scope.UserInfo.money / 100;
			if($scope.money > UserInfoMoney) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('金额错误')
					.textContent('可用余额不足，请充值')
					.ok('确定')
				).finally(function() {
					$location.path('/user/userRecharge');
				});
				return;
			}
			if(plan.type != 1) {
				if($scope.money == null || $scope.money == '' || isNaN($scope.money) != false) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('温馨提示')
						.textContent("输入金额才能加入计划！")
						.ok('确定')
					);
					return;
				}
			}
			$rootScope.money = angular.copy($scope.money);
			

			$scope.isShow = true;

			//
			//          $mdDialog.show({
			//              templateUrl: 'templates/index/join_select_voucher.html',
			//              parent: angular.element(document.body),
			//              clickOutsideToClose: true
			//          });
		};
		$scope.confirmBoxclose = function() {
			$scope.isShow = false;
		}
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		

		// 提交购买
		$scope.postInvestment = function(selectedItem, tradePassword, specialPlanPassword) {
			
			var selectedItem = parseInt(selectedItem);
			var pocketId = selectedItem;

			JoinService.newInvestment($routeParams.id, $rootScope.money, pocketId, tradePassword, specialPlanPassword);
			$scope.isShow = false;
			$mdDialog.hide();
		}
		$scope.switchTap = function(index) {
			$scope.activeTap = index;
			angular.element(".planBoxBg").show();
		}
		$scope.planBoxClose=function(){
			angular.element(".planBoxBg").hide();
		}
		
		//关闭计算器页面
        $scope.calculatorClose=function(){
			angular.element(".calculatorBg").hide();
		}
        
        //打开计算器页面
        $scope.calculatorBtnImg=function(){
			angular.element(".calculatorBg").show();
		}
        
        //计算收益
        $scope.resultMoney=0;
        $scope.calculatorResult=function(){
			if($scope.plan.stagingUnit=='day'){
				 $scope.resultMoney=$scope.calculatorMoney*($scope.plan.rate+$scope.plan.rasingRate)/3600*$scope.plan.staging
			}
			if($scope.plan.stagingUnit=='month'){
				 $scope.resultMoney=$scope.calculatorMoney*($scope.plan.rate+$scope.plan.rasingRate)/120*$scope.plan.staging
			}
		}
	})

	.factory('JoinService', function($http, $mdDialog, $location, $route, userOnlineBankService2) {
		var plan;
		var loans;
		var carLoan;
		var investments;
		var eachPageItems = 10;
		var loanPages;
		var investmentPages;
		var vouchers;
		var totalInvestment = 0;
		var totalLoan = 0;
		return {
			getTotal: function() {
				return {
					totalInvestment: totalInvestment,
					totalLoan: totalLoan
				}
			},
			synPlan: function(planId) {
				return $http.get(HOST_URL + "/plan/" + planId).success(function(responseData) {
					plan = responseData.resultData;
					//					console.log(plan);

				}).error(function() {

				});
			},
			getPlan: function() {
				return plan;
			},
			
			synInvestments: function(planId) {
				return $http.get(HOST_URL + "/plan/" + planId + "/investments").success(function(responseData) {
					investments = responseData.resultData;
					//					console.log(investments);
					totalInvestment = responseData.sumCount;
					console.log(responseData);
					var resultArr = [];

					for(var i = 0; i < Math.ceil(responseData.sumCount / eachPageItems); i++) {
						resultArr[i] = i;
					}
					investmentPages = resultArr;
					console.log(investmentPages);
				}).error(function() {

				});
			},
			selectInvestments: function(page) {
				var result = [];
				var limit;
				if(page == investmentPages.length || investmentPages.length == 0) {
					limit = investments.length;
				} else {
					limit = page * eachPageItems;
				}
				for(var i = (page - 1) * eachPageItems; i < limit; i++) {
					investments[i].indexId = i + 1;
					result.push(investments[i]);
				}
				return result;
			},
			getInvestmentPages: function() {
				return investmentPages;
			},
			newInvestment: function(planId, money, pocketId, tradePassword, specialPlanPassword) {
				var token = sessionStorage.token;
				var userId = sessionStorage.userId;
				var obj = this;

				return UserService.synUserAccount(userId, token).then(function() {
					var account = UserService.getUserAccount();
					obj.synPlan(planId);
					plan = obj.getPlan();
					var canInvestmentMoney = plan.amount - plan.nowSum;
					money *= 100;
					if(plan.type != 1) {
						if(money < plan.minAmount) {
							$mdDialog.show(
								$mdDialog.alert()
								.clickOutsideToClose(true)
								.title('投资金额过低')
								.textContent('单笔投资金额必须大于￥' + plan.minAmount / 100 + '元')
								.ok('确定')
							);
							return;
						}
					}
					if(plan.maxAmount != 0 && money > plan.maxAmount) {
						$mdDialog.show(
							$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('投资金额过高')
							.textContent('单笔投资金额必须小于￥' + plan.maxAmount / 100 + '元')
							.ok('确定')
						);
						return;
					}
					if(money > canInvestmentMoney) {
						$mdDialog.show(
							$mdDialog.alert()
							.clickOutsideToClose(true)
							.title('计划可投金额不足')
							.textContent('计划当前可投余额￥' + canInvestmentMoney / 100 + '元')
							.ok('确定')
						);
						return;
					}

					return obj.sendInvestment(planId, money, pocketId, tradePassword, specialPlanPassword);
				});
			},
			sendInvestment: function(planId, money, pocketId, tradePassword, specialPlanPassword) {
				var investment = {
					"planId": planId,
					"money": money,
					"pocketId": pocketId,
					"specialPlanPassword": specialPlanPassword,
					"tradePassword": tradePassword,
					"token": sessionStorage.token,
					"userId": sessionStorage.userId
				};

				return $http.post(
					HOST_URL + "/plan/" + planId + "/join",
					$.param(investment), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
				).success(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent('投资成功')
						.ok('确定')
					).finally(function() {
						//$location.path('/join');
						//window.location.reload();
						$location.path('/user/index');
					});
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('失败')
						.textContent(responseData['resultMsg'])
						.ok('确定')
					);
				});
			}
		}
	}).directive('onFinishRenderFilters', function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if(scope.$last === true) {
					$timeout(function() {
						scope.$emit('ngRepeatFinished');
					});
				}
			}
		}
	}).directive('bindHtmlCompile', ['$compile',  
        function($compile) {  
            return {  
                restrict: 'EA',  
                link: function(scope, element) {  
                    /*执行监听方法*/  
                    scope.$watch(  
                        function() {  
                            return angular.element(document.querySelector("#myDiv")).html();/*监听dom元素，监听id为myDiv的html的变化*/  
                        },  
                        function(value) {/*div一有变化，就执行这个方法*/  
                            element.html(value);  
                            $compile(element.contents())(scope);/*手动编译这块代码*/  
                        });  
                }  
            };  
        }]  
    ).directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        // body窗口的滚动加载--需要Jquery
        var forbid = false;
        $(".planBoxBg").scroll(function () {
            //滚动条距离顶部的距离
            var scrollTop = $(".planBoxBg").scrollTop();
            //滚动条的高度
            var scrollHeight = document.getElementById("planBoxBg").scrollHeight;;
            //窗口的高度
            var windowHeight = $(".planBoxBg").height();
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