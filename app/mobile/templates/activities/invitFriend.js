/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.invitFriend', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/mobile/invitFriend', {
			templateUrl: 'mobile/templates/activities/invitFriend.html',
			controller: 'invitFriend'
		});
	}])
	.controller('invitFriend', function($scope, $mdDialog, $location, $http) {
		var urlPath = $location.search();

		
		var token, userId;
		$scope.invitData = {
			"inviteUser": 0,
			"inviteMoney": 0
		}
		if(urlPath.hasOwnProperty('token') && urlPath.hasOwnProperty('userId')) {
			token = urlPath.token;
			userId = urlPath.userId;

			$scope.invitFriend = function() {
				$http.get(HOST_URL + "/user/account/" + userId + "/recommend/url?token=" + token).success(function(responseData) {
					if(responseData.resultCode == "0") {

						$scope.invitData = responseData.resultData;
						$scope.invitData.url=$scope.invitData.url.replace(/bitoujf/i,'xinguanlc')


						
						var qrcode = new QRCode('qrcode', {
							text: 'your content',
							width: 256,
							height: 256,
							colorDark: '#000000',
							colorLight: '#ffffff',
							correctLevel: QRCode.CorrectLevel.H
						});

						// 使用 API
						qrcode.clear();
						qrcode.makeCode($scope.invitData.url);
					}

				})

			};

			$scope.invitFriend();
		}
	});