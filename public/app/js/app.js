var app = angular.module("AdventureApp", ['AdventureCtrl', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise('/404');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/landing.html'
            // controller: ''
        })
        .state('voicetotext', {
            url: '/voicetotext',
            templateUrl: 'app/views/voicetotext.html'
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

