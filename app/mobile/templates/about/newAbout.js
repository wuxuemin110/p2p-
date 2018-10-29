'use strict';

angular.module('myApp.newAbout', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/mobile/newabout', {
            templateUrl: 'mobile/templates/about/newAbout.html',
            controller: 'newAbout'
        });
    }])

    .controller('newAbout', function ($scope, $location,$timeout) {
        $scope.currentLi = 4
        $scope.liIndex = 1;
        $timeout(function(){
        	        var mySwiper = new Swiper(".swiper-container", {
            slidesPerView: "auto",
            centeredSlides: !0,
                  initialSlide:0,
            // watchSlidesProgress: !0,
            // loop:true,
            // paginationClickable: !0,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
//              type: 'bullets',
            },
//             loop:true,

        });
        },100)

        // mySwiper.slideNext();
        //展示大图
        $scope.showBigimg=function(str){
          // var data=  {
          //       "start": 0, //初始显示的图片序号，默认0
          //       "data": [   //相册包含的图片，数组格式
          //       {
          //           "src":str, //原图地址
          //       }
          //   ]
          //   }
          //   // var json=JSON.stringify(data)
          //   layer.photos({
          //       photos: data
          //       ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
          //   })
            $('#z_bigimg').find('img').attr('src',str)
             layer.open({
                 type:1,
                 title:false,
                 shadeClose:true,
                 content:$('#z_bigimg'),

             })
        }
    })
//  .factory('AboutService', function ($http) {
//     
//      return {
//         
//      }
//  });