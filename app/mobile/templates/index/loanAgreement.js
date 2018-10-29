'use strict';

angular.module('myApp.loanAgreement', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/loanAgreement', {
			templateUrl: 'mobile/templates/index/loanAgreement.html',
			controller: 'loanAgreementCtrl'
		});
	}])
	.controller('loanAgreementCtrl', function($routeParams, $scope, loanAgreementCtrl,$http,$location) {
		 var urlPath = $location.search();
		 var token,id,userId;
		
        if (urlPath.hasOwnProperty('token')) {
             token = urlPath.token;
        }
        else{
        	$location.path('/mobile/notFound');
        }
        
        if (urlPath.hasOwnProperty('investmentId')) {
             id = urlPath.investmentId;
        }
        
         if (urlPath.hasOwnProperty('userId')) {
             userId = urlPath.userId;
        }
     
		loanAgreementCtrl.loanAgreementInfo(token,id,userId).then(function() {
//	loanAgreementCtrl.loanAgreementInfo("4a1afc6a06f6ede4db5149d6f8fbc3ae","2290","121859").then(function() {
			$scope.loanAgreement =loanAgreementCtrl.getLoanAgreementInfo();
			
				
             
		});


	})
	.factory('loanAgreementCtrl', function($http, $mdDialog) {
		var loanAgreementInfo; 
		return {
			getLoanAgreementInfo: function() {
				return loanAgreementInfo;
			},
			loanAgreementInfo: function(token,id,userId) {
				return $http.get(HOST_URL + "/user/"+userId+"/investment/"+id+"/agreement?token="+token).success(function(responseData) {
					if(responseData.resultCode = "0") {
						loanAgreementInfo = responseData.resultData;

						
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