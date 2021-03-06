(function () {
    angular
        .module("myApp").config(function ($routeProvider, $translateProvider, $locationProvider, $logProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/login'
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController'
            })
            .when('/profile', {
                templateUrl: 'app/profile/profile-new.html',
                controller: 'ProfileController',
                controllerAs: 'profile'
            })
            .when('/registration', {
                templateUrl: 'app/registration/registration.html',
                controller: 'registrationController'
            })
            .when('/feed', {
                templateUrl: 'app/kudos-feed/kudos-feed.html',
                controller: 'FeedController'
            })
            .when('/acorns', {
                templateUrl: 'app/acorns/acorns.html',
                controller: 'AcornController'
            })
            .when('/leaderboard', {
                templateUrl: 'app/leaderboard/leaderboard.html',
                controller: 'LeaderboardController'
            })
            .when('/notifications', {
                templateUrl: 'app/notifications/notification.html',
                controller: 'NotificationController'
            })
            .when('/me', {
                templateUrl: 'app/components/kudos-me/me.html',
                controller: 'MeController',
                controllerAs: 'me'
            })
            .when('/following', {
                templateUrl: 'app/components/kudos-following/kudos-following.html',
                controller: 'FollowingController',
                controllerAs: 'follow'
            })
            .when('/shop', {
                templateUrl: 'app/shop/shop.html',
                controller: 'ShopController',
                controllerAs: 'shop'
            })
            .when('/settings', {
                templateUrl: 'app/settings/settings.view.html',
                controller: 'SettingsController',
                controllerAs: 'setting'
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