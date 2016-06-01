var app = angular.module("AdventureApp", ['AdventureCtrl', 'AdventureService', 'ngAnimate', 'ui.bootstrap', 'ui.router', 'ngResource', 'duParallax']);

// Configures routes for the app including a 404 page.
app.config([
    '$stateProvider', 
    '$urlRouterProvider', 
    '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider){

        $urlRouterProvider.otherwise('/404');

        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/views/landing.html'
        })
        .state('voicetotext', {
            url: '/voicetotext',
            templateUrl: 'app/views/voicetotext.html'
            
        })
        .state('adventure', {
            url: '/adventure',
            templateUrl: 'app/views/adventure.html',
            controller: 'Adventure'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'app/views/userSignup.html',
            controller: 'SignupCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/userLogin.html',
            controller: 'LoginCtrl'
        })
        .state('404', {
            url: '/404',
            templateUrl: 'app/views/404.html'
        })

        $locationProvider.html5Mode(true);
    }
]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
}]);

