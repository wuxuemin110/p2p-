'use strict';


//var HOST_URL = "http://192.168.0.123:8090/";


var loginUrl = "/mobile/inputmobile";
// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'myApp.filter',
    'myApp.investment',
    'myApp.activityCenter',
    'myApp.join',
    'myApp.layout',
    'myApp.index',
    'myApp.planList',
    'myApp.inputmobile',
    'myApp.register',//注册
    'myApp.login',//登录
    'myApp.findPassword',//忘记密码
    'myApp.user',
    'myApp.InvestmentRecords',
    'myApp.fundDetails',
    'myApp.redPackage',
    'myApp.rateCoupon',
    'myApp.paymentPlans',
    'myApp.userWithdraw',
    'myApp.userSafeCenter',
    'myApp.news',
    'myApp.aboutUs',
    'myApp.about',
    'myApp.newAbout',
    'myApp.notices',
    'myApp.noticesList',
    'myApp.newsList',
    'myApp.faqList',
    'myApp.loanAgreement',//借款协议
    //	'myApp.userOnlineBank',
    'myApp.onlineMarking',//约标
    'myApp.newGuestWelfare',//新手福利
    'myApp.continueVote',//续投福利
    'myApp.redPacketRule',//红包规则
    'myApp.withdrawRule',//提现规则
    'myApp.invitFriend',//邀请好友
    'myApp.appDownload',
    'myApp.safeEnsure',
    'myApp.guaranteeInfo',
    'myApp.planDescription',//产品介绍

    'myApp.notFound',
    'myApp.planDescription',//产品说明
    'myApp.noviceExpress',//新手指导

    'myApp.shareRegister',
    'myApp.registration',//协议
    'myApp.newRegistration',

    'myApp.newYearActivity',
    'myApp.redPackage',
    'myApp.userRecharge',
    'myApp.userInvite',
    'myApp.projectDetail',
    'myApp.planDescription',
    'myApp.newActive',
    //活动页
    'myApp.registerActive1',
    'myApp.doubleSummer',
    'myApp.DragonBoatJie',
    'myApp.Novicewelfare',
    'myApp.JulySummer',
    'myApp.JulyDouble',
    'myApp.mingJuly',
    'myApp.xgftJuly',
    'myApp.AugustActive',
    'myApp.ReCast',
    'myApp.payment',
    'myApp.ActiveFirst',
    'myApp.ActiveSecond',
    'myApp.ActiveThree',
    'myApp.National',
    //厦门泰千利
    'myApp.tqabout',
    'myApp.tqonlineMarking',
    'myApp.tqnotices',
    'myApp.tqnewGuestWelfare',
    'myApp.tqcontinueVote',
    'myApp.tqredPacketRule',
    'myApp.tqwithdrawRule',
    'myApp.tqinvitFriend',
    'myApp.tqplanDescription',
    'myApp.tqnoviceExpress',
    'myApp.tqregistration',
    'myApp.tqDragonBoatJie',
    'myApp.tqActiveThree',
    'myApp.tqActiveSecond',
    'myApp.tqActiveFirst'


]).config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
    $routeProvider.otherwise({
        redirectTo: '/mobile/notFound'
    });
    //38妇女节活动
    $routeProvider.when('/mobile/ladiesDay', {
        templateUrl: 'mobile/templates/activities/ladiesDay.html',
    });
    //愚人节活动
    $routeProvider.when('/mobile/aprilFoolsDay', {
        templateUrl: 'mobile/templates/activities/aprilFoolsDay.html',
    });
    //五一活动
    $routeProvider.when('/mobile/laborDay', {
        templateUrl: 'mobile/templates/activities/laborDay.html',
    });
    $locationProvider.html5Mode(true);
}]).run(function ($rootScope, $templateCache) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (typeof(current) !== 'undefined') {
            $templateCache.remove(current.templateUrl);
        }
    });
});