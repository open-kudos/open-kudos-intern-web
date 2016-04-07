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
                console.log("Loged in successfully");               // TODO TEST PURPOSE, REMOVE LATER
            }, function errorCallback(response) {
                console.log("Log in failed");                       // TODO TEST PURPOSE, REMOVE LATER
            });
        };

        /* Method to check is user connected or not, can
        @return true/false */
        $scope.checkConnection = function () {
            $http({
                method: 'GET',
                url: SERVER.ip,
                withCredentials: true
            }).then(function successCallback(response) {
                console.log("Logged in: " + response.data.logged);  // TODO TEST PURPOSE, REMOVE LATER
                return response.data;
            }, function errorCallback(response) {
                console.log("Logged in: " + response.data.logged);  // TODO TEST PURPOSE, REMOVE LATER
            });
        };

        /* If user is connected response will be user profile information
         @return user */
        $scope.checkHome = function () {
            $http({
                method: 'GET',
                url: SERVER.ip + "/user/home",
                withCredentials: true
            }).then(function successCallback(response) {
                console.log("User car access information");     // TODO TEST PURPOSE, REMOVE LATER
                return response.data;
            }, function errorCallback(response) {
                console.log("User car access information");     // TODO TEST PURPOSE, REMOVE LATER
            });
        }

    }]);