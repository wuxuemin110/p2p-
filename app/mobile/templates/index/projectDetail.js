'use strict';

angular.module('myApp.projectDetail', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/projectDetail/:id', {
			templateUrl: 'mobile/templates/index/projectDetail.html',
			controller: 'projectDetailCtrl'
		});
	}])
	.controller('projectDetailCtrl', function($routeParams, $scope, projectDetailCtrl, $http,$compile, $interval,$location) {

		console.log($routeParams)
		console.log($location.search())
		console.log($location.path())
		projectDetailCtrl.projectDetailInfo($routeParams.id).then(function() {
			$scope.plan = projectDetailCtrl.getProjectDetailInfo();
			
			$scope.plan.description=$scope.plan.description.replace(/(font-size:[^><;"]*(;)?)/ig,"");
			$scope.plan.description=$scope.plan.description.replace(/(line-height:[^><;"]*(;)?)/ig,"");
			
			
			
//			$scope.plan.risk=$scope.plan.risk.replace(/(font-size:[^><;"]*(;)?)/ig,"");
//			$scope.plan.risk=$scope.plan.risk.replace(/(line-height:[^><;"]*(;)?)/ig,"");
              
		});



	})
	.factory('projectDetailCtrl', function($http, $mdDialog) {
		var projectDetailInfo;
		return {
			getProjectDetailInfo: function() {
				return projectDetailInfo;
			},
			projectDetailInfo: function(planID) {
				return $http.get(HOST_URL + "/plan/" + planID).success(function(responseData) {
					if(responseData.resultCode = "0") {
						projectDetailInfo = responseData.resultData;
							
						console.log(projectDetailInfo)
					}
				}).error(function(responseData) {
					$mdDialog.show(
						$mdDialog.alert()
						.clickOutsideToClose(true)
						.title('提示')
						.textContent(responseData.resultMsg)
						.ok('确定')
					);
				});
			}
		}
	});