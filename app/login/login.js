'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController'
        });
    }])

    .controller('loginController', ['$scope', '$http', '$cookies', 'SERVER', 'LoginService', function($scope, $http, $cookies, SERVER, LoginService){

        $scope.title = "Prisijungimas";
        $scope.registration = 'Registracija';
        $scope.name = "Vartotojo vardas";
        $scope.password = 'Slaptažodis';
        $scope.forgotPassword = 'Pamiršai slaptažodį';
        $scope.loginButton = 'Prisijungti';
        $scope.rememberMe = 'Prisiminti';

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