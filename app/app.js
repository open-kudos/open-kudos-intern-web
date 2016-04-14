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
config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    $routeProvider.otherwise({redirectTo: '/login'});

    $translateProvider.useStaticFilesLoader({
        prefix: 'translations/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useCookieStorage();
}]).
controller('AppController', function ($scope, $translate, $window) {
    $scope.changeLanguage = changeLanguage;

    function changeLanguage(key){
        $translate.use(key);
    }

    if ($window.location.href == "#/profile"){
        angular.element('multi-files');
    }

});

