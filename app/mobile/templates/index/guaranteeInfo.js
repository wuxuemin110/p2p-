'use strict';

angular.module('myApp.guaranteeInfo', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/guaranteeInfo/:id', {
			templateUrl: 'mobile/templates/index/guaranteeInfo.html',
			controller: 'guaranteeInfoCtrl'
		});
	}])
	.controller('guaranteeInfoCtrl', function($routeParams, $scope, guaranteeInfoService, $http,$compile, $interval) {
		guaranteeInfoService.guaranteeInfo($routeParams.id).then(function() {
			$scope.guaranteeInfo = guaranteeInfoService.getGuaranteeInfo();
                var compileFn=$compile(  
                        $scope.guaranteeInfo.guaranteeInfo
                    );  
                    var $dom=compileFn($scope);  
                    $dom.appendTo(document.getElementsByClassName('newWord'));
		});
		$scope.changePic = function($event) {
			var img = $event.srcElement || $event.target;
			angular.element("#img1")[0].src = img.src;

			angular.element(".imgGrayBg")[0].style.display = "block";
		}
		$scope.closePic = function() {

			angular.element(".imgGrayBg")[0].style.display = "none";

		}
	})
	.factory('guaranteeInfoService', function($http, $mdDialog) {
		var guaranteeInfo;
		return {
			getGuaranteeInfo: function() {
				return guaranteeInfo;
			},
			guaranteeInfo: function(guaranteeInfoID) {
				return $http.get(HOST_URL + "/plan/" + guaranteeInfoID + "/guaranteeInfo").success(function(responseData) {
					if(responseData.resultCode = "0") {
						guaranteeInfo = responseData.resultData;
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
			},
			updateFrequency: function(newsID, hits) {
				return $http.get(HOST_URL + "/notice/frequency/" + hits + "?id=" + newsID);
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
    );  