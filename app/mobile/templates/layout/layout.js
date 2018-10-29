'use strict';

angular.module('myApp.layout', ['ngRoute'])
    .controller('LayoutController', ['$scope', '$location', '$mdDialog','$rootScope', function ($scope, $location, $mdDialog,$rootScope) {
//      var userId = sessionStorage.userId;
//      var token = sessionStorage.token;
//      var userName = sessionStorage.userName;
       $rootScope.loading = true;
        
//      $httpProvider.interceptors.push(['$q','$rootScope',function($q,$rootScope){
//          return {
//              'request': function(config){
//                  $rootScope.loading = true;
//                  return $q.resolve(config);
//              },
//              'response': function(response){
//                  $rootScope.loading = false;
//                  return $q.resolve(response);
//              },
//              'requestError':function(rejection){
//                  $rootScope.loading = false;
//                  return $q.reject(rejection);
//              },
//              'responseError':function(rejection){
//                  $rootScope.loading = false;
//                  return $q.reject(rejection);
//              }
//          }
//      }]);
        
    }]).directive('pageload',function($rootScope, $timeout) {
    return {
        restrict: 'EAC',
        link: function(scope, element) {
            $rootScope.$watch('$viewContentLoaded', function() {
                $timeout(function() {
                    angular.element('.pageload').fadeOut(1500); 
                });
            });
        }
    };
});