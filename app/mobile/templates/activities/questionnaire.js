/**
 * Created by Administrator on 2017/11/06.
 */
angular.module('myApp.questionnaire', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/questionnaire', {
            templateUrl: 'mobile/templates/activities/questionnaire.html',
            controller: 'questionnaire'
        });
    }])
    .controller('questionnaire', function ($scope,$location, $mdDialog) {
    	$scope.riskAns={};
    	$scope.riskSub=function(){
    		var one = $("input[name='answer0']:checked").val()
            var two = $("input[name='answer1']:checked").val()
            var three = $("input[name='answer2']:checked").val()
            var four = $("input[name='answer3']:checked").val()
            var five = $("input[name='answer4']:checked").val()
            var six = $("input[name='answer5']:checked").val()
            
            if(one == undefined || two == undefined || three == undefined || four == undefined || five == undefined || six == undefined){
            	 $mdDialog.show(
					$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('提示')
					.textContent('请先完成所有题目再提交')
					.ok('确定')
				);
                return;
            } 
//          console.log($scope.riskAns.answer6,$scope.riskAns.answer5,$scope.riskAns.answer4);
    		if($scope.riskAns.answer6=="D"||$scope.riskAns.answer6=="E"||$scope.riskAns.answer5=="D"||$scope.riskAns.answer5=="E"||$scope.riskAns.answer4=="D"||$scope.riskAns.answer4=="E"){
    		$location.path('/mobile/evaluationResult/1');
    		}
    		else{
    		$location.path('/mobile/evaluationResult/2');		
    		}
    		
    	}
    });