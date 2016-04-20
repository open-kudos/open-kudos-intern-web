/**
 * Created by vytautassugintas on 20/04/16.
 */
angular
    .module("myApp").config(function ($routeProvider, $translateProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: '/open-kudos-intern-web/src/app/login/login.html',
            controller: 'loginController'
        })
        .when('/profile', {
            templateUrl: '/open-kudos-intern-web/src/app/profile/profile.html',
            controller: 'profileController'
        })
        .when('/registration', {
            templateUrl: '/open-kudos-intern-web/src/app/registration/registration.html',
            controller: 'registrationController'
        });

    $translateProvider.useStaticFilesLoader({
        prefix: '/open-kudos-intern-web/src/app/translations/locale-',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useCookieStorage();
});