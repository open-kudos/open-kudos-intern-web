/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular.module('myApp.profile', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'profileController'
        });
    }])

    .controller('profileController', function ($http, $scope, $window, $cookies, SERVER) {

        check();

        $http({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:8080/user/home'
        }).then(function successCallback(response) {
            console.log(response);
            $scope.userEmail = response.data.user.email;
            $scope.userName = response.data.user.firstName;
            $scope.userSurname = response.data.user.lastName;
        }, function errorCallback(response) {
            console.log(response)
        });

        $scope.logout = function () {
            console.log("Logging out");
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8080/logout'
            }).then(function successCallback(response) {
                clear();
                check();
            }, function errorCallback(response) {
                clear();
                check();
            });
        }

        function check() {
            $http({
                method: 'GET',
                url: SERVER.ip,
                withCredentials: true
            }).then(function successCallback(response) {
                console.log("Logged in: " + response.data.logged);  // TODO TEST PURPOSE, REMOVE LATER
                if (response.data.logged) {
                    $window.location.href = "http://" + $window.location.host + "/open-kudos-intern-web/app/index.html#/profile";
                } else {
                    $window.location.href = "http://" + $window.location.host + "/open-kudos-intern-web/app/index.html#/login";
                }
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

        function clear(){
            $cookies.put('ru', 'false');
            $cookies.put('e', '');
        }

    });