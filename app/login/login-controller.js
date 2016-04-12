'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies', 'base64'])
    .config(function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController',
            controllerAs: 'login'
        });
    })

    .controller('loginController', ['$scope', '$http', '$cookies', '$window', '$base64', 'SERVER', 'LoginService',
        function ($scope, $http, $cookies, $window, $base64, SERVER, LoginService) {
            initView();

            /**
             * Login function which takes values from form in login.html
             * and makes POST call to the api via LoginService also
             */
            $scope.Login = function () {

                var rememberMe = $scope.rememberMeCheckbox;

                var data = $.param({
                    email: this.email,
                    password: this.password
                });

                if (rememberMe) {
                    LoginService.rememberMe(data);
                } else {
                    LoginService.login(data).then(function (val) {
                        $scope.loginError = '';
                    }).catch(function () {
                        loginValidation($scope.email, $scope.password);
                    });
                }
            };

            function initView() {
                var ru = $cookies.get('ru');
                if (ru === 'true') {
                    LoginService.login($base64.decode($cookies.get('e')));
                } else {
                    LoginService.checkUser();
                }
            }

            function loginValidation(email, password) {
                if ((email == '') || (password == '')) {
                    $scope.loginError = 'Wrong Email and Password';
                } else {
                    $scope.loginError = 'Wrong Email or Password';
                }
            }

            /**
             *  ******************************************************************
             */
            /**
             ************************ Set language section ***********************
             */
            var lang = $cookies.get('language');

            if (lang == null) {
                $cookies.put('language', 'en');
                setLanguage('en');
                language = $cookies.get('language');
            } else {
                setLanguage(lang);
            }

            $scope.lt = function () {
                setLanguage('lt');
                $cookies.put('language', 'lt');
            };

            $scope.en = function () {
                setLanguage('en');
                $cookies.put('language', 'en');
            };

            function setLanguage(language) {
                $http.get('../app/translations/' + language + '.json').success(function (data) {
                    $scope.language = data;
                })
            }
            /**
             *  ********************* End of section *******************************
             */
    }]);