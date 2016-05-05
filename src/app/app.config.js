/**
 * Created by vytautassugintas on 20/04/16.
 */
(function () {
    angular
        .module("myApp").config(function ($routeProvider, $translateProvider, $locationProvider, $logProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/feed'
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
            })
            .when('/feed', {
                templateUrl: 'app/kudos-feed/kudos-feed.html',
            });

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/translations/locale-',
            suffix: '.json'
        });

        $logProvider.debugEnabled(true);

        //$locationProvider.html5Mode(true);

        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useCookieStorage();
    });
})();