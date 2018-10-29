'use strict';

angular.module('myApp.inputmobile', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/inputmobile', {
			templateUrl: 'mobile/templates/index/inputmobile.html',
			controller: 'inputmobileCtrl'
		});
	}])

	.controller('inputmobileCtrl', function($scope, $http,$location, $mdDialog) {
		$scope.inputmobileBtn=false;
		$scope.inputmobile ='';
		$scope.$watch('inputmobile', function(newValue, oldValue) {
           if((/^1[3|4|5|7|8|9][0-9][0-9\*]{4}[0-9]{4}$/.test($scope.inputmobile))) {
				$scope.inputmobileBtn=true;
			}else{
				$scope.inputmobileBtn=false;
			}
        });
        $scope.inputmobileClick=function(){
        	if(!(/^1[3|4|5|7|8|9][0-9][0-9\*]{4}[0-9]{4}$/.test($scope.inputmobile))) {
				$mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('手机号填写错误')
					.ok('确定')
				);
				return;
			}
        	var inputmobileData = {
					"phone": $scope.inputmobile
					
				}
        	$http.post(
					HOST_URL + "user/check",
        	       $.param(inputmobileData), {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}
        	).success(function(responseData) {
					if(responseData.resultCode == "0") {
						var registered = responseData.resultData.registered;
						if(registered==true){
							var path='/mobile/login?phone='+inputmobileData.phone;
							location.href=path;
						}
						else{
							var path='/mobile/register?phone='+inputmobileData.phone;
							location.href=path;
							
						}
					} 
				})
        }
	})
