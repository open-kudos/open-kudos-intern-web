'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies', 'base64'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController',
            controllerAs: 'login'
        });
    }])

    .controller('loginController', ['$scope', '$http', '$cookies', '$window', '$base64', 'SERVER', 'LoginService', function ($scope, $http, $cookies, $window, $base64, SERVER, LoginService) {
        var language;

        initView();

        if (!$cookies.get('language')) {
            $cookies.put('language', 'en');
            language = $cookies.get('language');

        } else language = $cookies.get('language');

        if (language == 'en') {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Email";
            $scope.password2 = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
        } else if (language == 'lt') {
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "El. paštas";
            $scope.password2 = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
        }

        $scope.lt = function () {
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "El. paštas";
            $scope.password2 = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
            $cookies.put('language', 'lt');
        };

        $scope.en = function () {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Email";
            $scope.password2 = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
            $cookies.put('language', 'en');
        };

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

        function loginValidation (email, password){
            if ((email == '') || (password == '')){
                $scope.loginError = 'Enter Email and Password';
            } else {
                $scope.loginError = 'Wrong Email or Password';
            }
        }

    }]);