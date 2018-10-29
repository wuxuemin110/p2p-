'use strict';

angular.module('myApp.tqabout', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqabout', {
            templateUrl: 'mobile/templates/about/tqabout.html',
            controller: 'tqabout'
        });
    }])

    .controller('tqabout', function ($scope, $location, $timeout) {
        $scope.currentLi = 4
        $scope.liIndex = 1;
        $timeout(function () {
            var mySwiper = new Swiper(".honorSwiper", {
                slidesPerView: "auto",
                centeredSlides: !0,
                initialSlide: 1,
                pagination: {
                    el: '.swiper-pagination',

                }


            });
        }, 100)

        $timeout(function () {
            var teamSwiper = new Swiper(".teamSwiper", {
                freeMode: true,
                slidesPerView: 'auto',

            });
        }, 100)


        //展示大图
        $scope.showBigimg = function (str) {

            $('#z_bigimg').find('img').attr('src', str)
            layer.open({
                type: 1,
                title: false,
                shadeClose: true,
                content: $('#z_bigimg'),

            })
        }
    })
