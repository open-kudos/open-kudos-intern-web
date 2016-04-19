'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'pascalprecht.translate',
    'myApp.login',
    'myApp.registration',
    'myApp.profile',
    'myApp.version'
]).
config(function ($routeProvider, $translateProvider) {

    $routeProvider.otherwise({
        redirectTo: '/login'
    });

    $translateProvider.useStaticFilesLoader({
        prefix: 'translations/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useCookieStorage();
}).
controller('AppController', function ($scope, $translate) {
    $scope.changeLanguage = changeLanguage;

    function changeLanguage(key){
        $translate.use(key);
    }

});

