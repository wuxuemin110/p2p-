'use strict';

angular.module('myApp.tqnotices', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqnotices/:id', {
            templateUrl: 'mobile/templates/user/tqnotices.html',
            controller: 'tqnotices'
        });
    }])
    .controller('tqnotices', function ($routeParams,$scope,NoticesService2) {
//      $scope.Jump = function (page) {
//          location.href = "/about/?page=" + page;
//      }
        NoticesService2.notices($routeParams.id).then(function () {
            $scope.Notices =  NoticesService.getNotices();
            $scope.Notices.content= $scope.Notices.content.replace(/(font-size:[^><;"]*(;)?)/ig,"");
            $scope.Notices.content= $scope.Notices.content.replace(/(line-height:[^><;"]*(;)?)/ig,"");
            // NoticesService.updateFrequency(NoticesService.getNotices()[1].id,NoticesService.getNotices()[1].hits)
        });
    })
    .factory('NoticesService2', function ($http,$mdDialog) {
        var notices;
        return {
            getNotices: function () {
                return notices;
            },
            notices: function (newsID) {
                return $http.get(HOST_URL + "/notice/details/wq/" + newsID).success(function (responseData) {
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