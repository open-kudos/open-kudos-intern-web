/**
 * Created by vytautassugintas on 20/04/16.
 */
angular
    .module("myApp").config(function ($routeProvider, $translateProvider, $locationProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'loginController'
        })
        .when('/profile', {
            templateUrl: 'app/profile/profile.html',
            controller: 'profileController'
        })
        .when('/registration', {
            templateUrl: 'app/registration/registration.html',
            controller: 'registrationController'
        });

    $translateProvider.useStaticFilesLoader({
        prefix: 'app/translations/locale-',
        suffix: '.json'
    });

    //$locationProvider.html5Mode(true);

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useCookieStorage();
});