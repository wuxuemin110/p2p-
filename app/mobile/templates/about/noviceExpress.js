  'use strict';

angular.module('myApp.noviceExpress', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/noviceExpress', {
            templateUrl: 'mobile/templates/about/noviceExpress.html',
            controller: 'NoviceExpressCtrl'
        });
    }])

    .controller('NoviceExpressCtrl', function (NoviceExpressService) {
        var mySwiper = new Swiper ('.swiper-container', {
            // direction: 'vertical',
            // loop: true,

            // 如果需要分页器
            // pagination: {
            //     el: '.swiper-pagination',
            // },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
        })
    })

    .factory('NoviceExpressService', function ($http) {
        return {}
    });