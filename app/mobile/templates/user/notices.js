'use strict';

angular.module('myApp.notices', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/notices/:id', {
            templateUrl: 'mobile/templates/user/notices.html',
            controller: 'noticesCtrl'
        });
    }])
    .controller('noticesCtrl', function ($routeParams,$scope,NoticesService) {
//      $scope.Jump = function (page) {
//          location.href = "/about/?page=" + page;
//      }
        console.log($routeParams.id)
      
        NoticesService.notices($routeParams.id).then(function () {

            $scope.Notices =  NoticesService.getNotices();
              $scope.Notices.content= $scope.Notices.content.replace(/(font-size:[^><;"]*(;)?)/ig,"");
              $scope.Notices.content= $scope.Notices.content.replace(/(line-height:[^><;"]*(;)?)/ig,"");
           // NoticesService.updateFrequency(NoticesService.getNotices()[1].id,NoticesService.getNotices()[1].hits)
        });
    })
    .factory('NoticesService', function ($http,$mdDialog) {
        var notices;
        return {
            getNotices: function () {
                return notices;
            },
            notices: function (newsID) {
                return $http.get(HOST_URL + "/notice/details/" + newsID).success(function (responseData) {
                	  if(responseData.resultCode="0"){
                    notices = responseData.resultData;
                   }
                }).error(function (responseData) {
                    $mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent(responseData['resultMsg'])
					.ok('确定')
				);
                });
            },
            updateFrequency: function (newsID,hits) {
                return $http.get(HOST_URL + "/notice/frequency/" + hits+"?id="+newsID);
            }
        }
    });