'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController'
        });
    }])

    .controller('loginController', ['$scope', '$http', '$cookies', 'SERVER', 'LoginService', function($scope, $http, $cookies, SERVER, LoginService){
        var language;

        if (!$cookies.get('language')) {
            $cookies.put('language', 'en');
            language = $cookies.get('language');

        } else language = $cookies.get('language');

        if (language == 'en') {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Username";
            $scope.password = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
        } else if (language == 'lt'){
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "Vartotojo vardas";
            $scope.password = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
        }

        $scope.lt = function() {
            $scope.title = "Prisijungimas";
            $scope.registration = 'Registracija';
            $scope.name = "Vartotojo vardas";
            $scope.password = 'Slaptažodis';
            $scope.forgotPassword = 'Pamiršai slaptažodį';
            $scope.loginButton = 'Prisijungti';
            $scope.rememberMe = 'Prisiminti';
            $cookies.put('language', 'lt');
        };

        $scope.en = function() {
            $scope.title = "Login";
            $scope.registration = 'Registration';
            $scope.name = "Username";
            $scope.password = 'Password';
            $scope.forgotPassword = 'Forgot password';
            $scope.loginButton = 'Login';
            $scope.rememberMe = 'Remember me';
            $cookies.put('language', 'en');
        };

        /*  Login function which takes values from form in login.html
         and makes POST call to the api  */
        $scope.Login = function () {
            var data = $.param({
                email: $scope.email,
                password: $scope.password
            });
            login(data);
        //    LoginService.login(data);
        };

        function login(data) {
            $http({
                method: 'POST',
                //   url: 'http://localhost:8080/login?' + data
                url: SERVER.ip + "/login?" + data,
                withCredentials: true
            }).then(function successCallback(response) {

                console.log(response);
            //    console.log(authdata);
            //    console.log(value);
            }, function errorCallback(response) {
                console.log(response.data);
            });
        }

        $scope.checkConnection = function () {
            $http({
                method: 'GET',
                url: SERVER.ip,
                withCredentials: true
            }).then(function successCallback(response) {
                console.log("IN: " + response.data.logged);
            }, function errorCallback(response) {
                console.log(response.data)
            });
        };

            $scope.checkHome = function () {
                $http({
                    method: 'GET',
                    url: SERVER.ip + "/user/home",
                    withCredentials: true
                }).then(function successCallback(response) {
                    console.log(response);
                }, function errorCallback(response) {
                    console.log(response.data)
                });
            }


    }]);