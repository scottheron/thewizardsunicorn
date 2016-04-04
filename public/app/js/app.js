var app = angular.module("AdventureApp", ['AdventureCtrl', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'ngResource']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise('/404');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/landing.html'
            
        })
        .state('voicetotext', {
            url: '/voicetotext',
            templateUrl: 'app/views/voicetotext.html',
            controller: 'Adventure'
        })
        .state('adventure', {
            url: '/adventure',
            templateUrl: 'app/views/adventure.html'
            //controller: 'adventure'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/views/404.html'
        })

        $locationProvider.html5Mode(true);
    }
]);

