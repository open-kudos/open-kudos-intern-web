'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController',
            controllerAs: 'login'
        });
    }])

    .controller('loginController', ['$scope', '$http', '$cookies', '$window', 'SERVER', 'LoginService', function ($scope, $http, $cookies, $window, SERVER, LoginService) {
        var language;

        LoginService.checkUser();

        if (!$cookies.get('language')) {
            $cookies.put('language', 'en');
            language = $cookies.get('language');

        } else language = $cookies.get('language');

        if (language == 'en') {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Email";
            $scope.password = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
        } else if (language == 'lt') {
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "Paštas";
            $scope.password = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
        }

        $scope.lt = function () {
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "Paštas";
            $scope.password = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
            $cookies.put('language', 'lt');
        };

        $scope.en = function () {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Email";
            $scope.password = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
            $cookies.put('language', 'en');
        };


        /**
         * Login function which takes values from form in login.html
         * and makes POST call to the api via LoginService
         */
        $scope.Login = function () {

            var data = $.param({
                email: this.email,
                password: this.password
            });

            LoginService.login(data);
        };

    }]);