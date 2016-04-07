/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular.module('myApp.profile', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'profileController'
        });
    }])

    .controller('profileController', function ($http, $scope) {

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

        $scope.logout = function(){
            console.log("Logging out");
            $http({
                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8080/logout'
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }


    });