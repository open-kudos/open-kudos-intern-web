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
                templateUrl: 'app/views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'home',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/notifications', {
                templateUrl: 'app/views/notifications/notification.html',
                controller: 'NotificationController',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/me', {
                templateUrl: 'app/components/kudos-me/me.html',
                controller: 'MeController',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/following', {
                templateUrl: 'app/views/following/following.html',
                controller: 'FollowingController',
                controllerAs: 'follow',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/history/:userId', {
                templateUrl: 'app/views/history/history.html',
                controller: 'HistoryViewController',
                controllerAs: 'history',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/shop', {
                templateUrl: 'app/views/shop/shop.html',
                controller: 'ShopController',
                controllerAs: 'shop',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/settings', {
                templateUrl: 'app/views/settings/settings.view.html',
                controller: 'SettingsController',
                controllerAs: 'setting',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
                }
            })
            .when('/edit', {
                templateUrl: 'app/views/edit-user/edit-user.html',
                controller: 'EditController',
                controllerAs: 'editCtrl',
                resolve: {
                    auth: ['Auth', function (Auth) {return Auth.check();}],
                    user: ['User', function (User) {return User.getCurrentUserProfile();}]
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