(function () {
    angular
        .module("myApp").config(function ($routeProvider, $translateProvider, $locationProvider, $logProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/login'
            })
            .when('/login', {
                templateUrl: 'app/views/login/login.html',
                controller: 'LoginController'
            })
            .when('/registration', {
                templateUrl: 'app/views/registration/registration.html',
                controller: 'registrationController'
            })
            .when('/feed', {
                templateUrl: 'app/views/kudos-feed/kudos-feed.html',
                controller: 'FeedController'
            })
            .when('/profile', {
                templateUrl: 'app/views/profile/profile-new.html',
                controller: 'ProfileController',
                controllerAs: 'profile',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/acorns', {
                templateUrl: 'app//views/acorns/acorns.html',
                controller: 'AcornController',
                controllerAs: 'acorn',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/notifications', {
                templateUrl: 'app/views/notifications/notification.html',
                controller: 'NotificationController',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/me', {
                templateUrl: 'app/components/kudos-me/me.html',
                controller: 'MeController',
                controllerAs: 'me',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/following', {
                templateUrl: 'app/components/kudos-following/kudos-following.html',
                controller: 'FollowingController',
                controllerAs: 'follow',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/shop', {
                templateUrl: 'app/views/shop/shop.html',
                controller: 'ShopController',
                controllerAs: 'shop',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
            })
            .when('/settings', {
                templateUrl: 'app/views/settings/settings.view.html',
                controller: 'SettingsController',
                controllerAs: 'setting',
                resolve: {
                    auth: function (Auth) {return Auth.check();}
                }
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