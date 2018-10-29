/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.evaluationResult', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/evaluationResult/:id', {
            templateUrl: 'mobile/templates/activities/evaluationResult.html',
            controller: 'evaluationResult'
        });
    }])
    .controller('evaluationResult', function ($scope,$location, $mdDialog,$routeParams) {
    	
    	 var typeData=$routeParams.id;
    	
        if(typeData==1){
        	$scope.text="积极型";
        }
        else if(typeData==2){
        	$scope.text="稳健性";
        }
        
        	$scope.gotoInvestFragment = function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
			var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid) {
				window.H5Method.gotoInvestFragment();
			}
			if(isIOS) {　　　　
				gotoInvestFragment();
			}

		}
    });