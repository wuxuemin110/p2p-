'use strict';

angular.module('myApp.newActive', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/mobile/newActive', {
            templateUrl: 'mobile/templates/activities/newActive.html',
            controller: 'newActive'
        });
    }])

    .controller('newActive', function($scope, $http, $location, $mdDialog, shareRegisterService, userOnlineBankService2) {
        $scope.registerInfo = {
            'user': {
                //              'role': 100
            },
            'userInfo': {
                'recommendCode': ''
            },
            'code': ''
        };
        if ($location.search().tid) {
            sessionStorage.tid = $location.search().tid;

        }

        $scope.checkbox = function($event) {　　
            var checked = $event.target;　　
            if (checked.checked) {　　　　
                angular.element('.spanBlock').show();　
                angular.element('.spanNone').hide();　　
            } else {　　　　
                angular.element('.spanBlock').hide();　
                angular.element('.spanNone').show();　　
            };
        };
        /*$scope.closeBox = function() {
            angular.element('.shareRegisterBox').hide();
            

            window.location.href = "http://sj.qq.com/myapp/detail.htm?apkName=com.jinyoujf"
        }*/

        $scope.closeBox1 = function() {
            angular.element('.shareRegisterBox1').hide();
           

            $location.path('/mobile/login');
        }

        var urlPath = $location.search();
        if (urlPath.hasOwnProperty('recommendUser')) {
            $scope.registerInfo.userInfo.recommendCode = urlPath.recommendUser;

        }

        //      $scope.setRole = function (input) {
        //          // 设置角色
        //          $scope.registerInfoData.user.role = input;
        //          if (input == 100) {
        //              angular.element("#borrower").removeClass("active");
        //              angular.element("#investor").addClass("active");
        //          } else {
        //              angular.element("#borrower").addClass("active");
        //              angular.element("#investor").removeClass("active");
        //          }
        //      };
        $scope.register = function() {

            //          if ($scope.registerInfo.user.name == undefined || $scope.registerInfo.user.name == '') {
            //              $mdDialog.show(
            //                  $mdDialog.alert()
            //                      .clickOutsideToClose(true)
            //                      .title('提示')
            //                      .textContent('用户名不能为空')
            //                      .ok('确定')
            //              );
            //              return;
            //          }
            //
            //          if ($scope.registerInfo.user.name.length < 6) {
            //              $mdDialog.show(
            //                  $mdDialog.alert()
            //                      .clickOutsideToClose(true)
            //                      .title('提示')
            //                      .textContent('用户名不能小于6个字符')
            //                      .ok('确定')
            //              );
            //              return;
            //          }

            if ($scope.registerInfo.userInfo.phone == undefined || $scope.registerInfo.userInfo.phone == '') {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('提示')
                    .textContent('手机号不能为空')
                    .ok('确定')
                );
                return;
            }

            if (!(/^1[3|4|5|7|8|9]\d{9}$/.test($scope.registerInfo.userInfo.phone))) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('提示')
                    .textContent('手机号填写错误')
                    .ok('确定')
                );
                return;
            }

            if ($scope.registerInfo.user.password == undefined || $scope.registerInfo.user.password == '') {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('提示')
                    .textContent('密码不能为空')
                    .ok('确定')
                );
                return;
            }

            //          if ($scope.registerInfo.user.password2 == undefined || $scope.registerInfo.user.password2 == '') {
            //              $mdDialog.show(
            //                  $mdDialog.alert()
            //                      .clickOutsideToClose(true)
            //                      .title('提示')
            //                      .textContent('确认密码不能为空')
            //                      .ok('确定')
            //              );
            //              return;
            //          }
            //
            //          if ($scope.registerInfo.user.password != $scope.registerInfo.user.password2) {
            //              $mdDialog.show(
            //                  $mdDialog.alert()
            //                      .clickOutsideToClose(true)
            //                      .title('提示')
            //                      .textContent('两次密码不一致')
            //                      .ok('确定')
            //              );
            //              return;
            //          }

            //          if ($scope.registerInfo.user.role == 200) {
            //              if ($scope.registerInfo.userInfo.realName == undefined || $scope.registerInfo.userInfo.realName == '') {
            //                  $mdDialog.show(
            //                      $mdDialog.alert()
            //                          .clickOutsideToClose(true)
            //                          .title('提示')
            //                          .textContent('真实姓名不能为空')
            //                          .ok('确定')
            //                  );
            //                  return;
            //              }
            //          }
            var urlPath = $location.search();

            if (urlPath.hasOwnProperty('channel')) {
                $scope.registerInfo.userInfo.channel = urlPath.channel;

            }



            shareRegisterService.register($scope.registerInfo);
        };
        $scope.changeVerificationCode = function() {
            $http.get(HOST_URL + "/code").success(function(responseData) {
                if (responseData.resultCode == "0") {
                    document.getElementById("verificationCode").src = "data:image/gif;base64," + responseData.resultData['image'];
                } else {
                    userOnlineBankService2.alertInfo(responseData);
                }
            }).error(function(responseData) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('发生错误')
                    .textContent(responseData['resultMsg'])
                    .ok('确定')
                );
            });
        };
        $scope.sendSms = function() {
            var data = {
                "code": $scope.imgCode,
                "phone": $scope.registerInfo.userInfo.phone
            }
            //			console.log(data);
            $http.post(
                HOST_URL + "/sms/register",
                $.param(data), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            ).success(function(responseData) {
                if (responseData.resultCode == "0") {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('提示')
                        .textContent("短信发送成功")
                        .ok('确定')
                    );
                } else {
                    $scope.changeVerificationCode();
                    userOnlineBankService2.alertInfo(responseData);
                }
            }).error(function(responseData) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('发生错误')
                    .textContent(responseData['resultMsg'])
                    .ok('确定')
                );
                $scope.changeVerificationCode();
            });
        };
        // 执行
        $scope.changeVerificationCode();

     
    })

    .factory('shareRegisterService', function($http, $mdDialog, $location, userOnlineBankService2) {
        var registerInfoData = {};
        return {
            register: function(registerInfo) {
                //				console.log(registerInfo);
                var alert;
                var param = "";
                registerInfoData = {
                    "phone": registerInfo.userInfo.phone,
                    "password": registerInfo.user.password,
                    "code": registerInfo.code,
                    "recommendCode": registerInfo.userInfo.recommendCode,
                    "channel": registerInfo.userInfo.channel
                }
                //				console.log(registerInfoData);
                //易瑞特记录
                if (sessionStorage.getItem("tid")) {
                    param += "?tid=" + sessionStorage.getItem("tid");
                }
                return $http.post(
                    HOST_URL + "/user/register" + param,
                    $.param(registerInfoData), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                ).success(function(responseData) {
                    //					console.log(responseData);
                    if (responseData.resultCode == "0") {
                        var registerData = responseData.resultData;
                        //						sessionStorage.setItem('userId', registerData.userId);
                        //						sessionStorage.setItem('userName', registerData.userName);
                        //						sessionStorage.setItem('role', registerData.role);
                        //						sessionStorage.setItem('token', registerData.token);
                        //						$mdDialog.show(
                        //							alert = $mdDialog.alert()
                        //							.clickOutsideToClose(true)
                        //							.title('提示')
                        //							.textContent('注册成功，3秒后自动跳转到个人中心。')
                        //							.ok('确定')
                        //						).finally(function() {
                        //							$location.path('/user/index');
                        //						});
                        //						setTimeout(function() {
                        //							//self.location = "/user/index";
                        //							$mdDialog.hide(alert);
                        //						}, 3000);
                        //		
                       /* var u = navigator.userAgent;										
                        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端	*/

                       
                       
                            
                        
                            angular.element('.shareRegisterBox1').show();

                       
                    } else {
                        userOnlineBankService2.alertInfo(responseData);
                    }
                }).error(function(responseData) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('发生错误')
                        .textContent(responseData['resultMsg'])
                        .ok('确定')
                    );
                });
            }
        }
    });