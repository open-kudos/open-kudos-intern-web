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
                templateUrl: 'app/profile/profile-new.html',
                controller: 'ProfileController'
            })
            .when('/registration', {
                templateUrl: 'app/registration/registration.html',
                controller: 'registrationController'
            })
            .when('/feed', {
                templateUrl: 'app/kudos-feed/kudos-feed.html',
            })
            .when('/acorns', {
                templateUrl: 'app/acorns/acorns.html',
                controller: 'AcornController'
            })
            .when('/notifications', {
            templateUrl: 'app/notifications/notification.html',
                controller: 'NotificationController'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/translations/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.useCookieStorage();

        $logProvider.debugEnabled(true);
    });
})();