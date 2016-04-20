'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'pascalprecht.translate',
    'myApp.login',
    'myApp.registration',
    'myApp.profile',
    'myApp.version'
])
    .config(function ($routeProvider, $translateProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: '/open-kudos-intern-web/app/login/login.html',
            controller: 'loginController'
        })
        .when('/profile', {
            templateUrl: '/open-kudos-intern-web/app/profile/profile.html',
            controller: 'profileController'
        })
        .when('/registration', {
            templateUrl: '/open-kudos-intern-web/app/registration/registration.html',
            controller: 'registrationController'
        });

        $translateProvider.useStaticFilesLoader({
        prefix: '/open-kudos-intern-web/app/translations/locale-',
        suffix: '.json'
    });
    
    $translateProvider.preferredLanguage('en');
    $translateProvider.useCookieStorage();
})

    .controller('AppController', function ($scope, $translate) {
    $scope.changeLanguage = changeLanguage;

    function changeLanguage(key){
        $translate.use(key);
    }

});

