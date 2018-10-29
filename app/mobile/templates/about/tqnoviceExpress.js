'use strict';

angular.module('myApp.tqnoviceExpress', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/tqnoviceExpress', {
            templateUrl: 'mobile/templates/about/tqnoviceExpress.html',
            controller: 'tqnoviceExpress'
        });
    }])

    .controller('tqnoviceExpress', function (NoviceExpressService) {
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