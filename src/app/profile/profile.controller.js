/**
 * Created by vytautassugintas on 06/04/16.
 */
(function () {
    'use strict';
    var ProfileController = function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges, Resources) {
        $scope.showLoaderUserAvailableKudos = true;
        $scope.showLoaderUserReceivedKudos = true;
        
        $scope.greeting = "hello";

        $scope.userAvailableKudos = 0;
        $scope.userReceivedKudos = 0;

        $scope.usersCollection = [];
        $scope.topReceivers = [];
        $scope.buttonDisabled = true;
        $scope.receivedAcorns = false;
        $scope.sentAcorns = true;
        $scope.giveAcorns = false;
        $scope.new = true;

        $scope.showDropDown = false;

        $scope.receiverErrorClass = "";
        $scope.receiverErrorMessage = "";
        $scope.amountErrorClass = "";
        $scope.amountErrorMessage = "";

        $scope.isValid = isValid;

        function activate() {
            checkUser();

            ProfileService.userHome().then(function (val) {
                Resources.setCurrentUser(val);
                Resources.setCurrentUserEmail(val.email);
            });

            ProfileService.remainingKudos().then(function (val) {
                Resources.setUserAvailableKudos(val);
            });

            ProfileService.receivedKudos().then(function (val) {
                $scope.userReceivedKudos = val;
                $scope.showLoaderUserReceivedKudos = false;
            });
            
            if(isEmptyCollection(Resources.getUsersCollection())){
                ProfileService.listUsers().then(function (val) {
                    Resources.setUsersCollection(val.userList);
                    $scope.usersCollection = Resources.getUsersCollection();
                });
            }
        }

        activate();
        
        $scope.$watch(function () {
            return Resources.getUserAvailableKudos()
        }, function (newVal) {
            if (!isValid(newVal)) {
                $scope.userAvailableKudos = Resources.getUserAvailableKudos();
                $scope.showLoaderUserAvailableKudos = false;
            }
        });

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });
        }

        function isValid(value) {
            value == undefined;
            return typeof value === "undefined";
        }
    };

    ProfileController.$inject = ['$http', '$scope', '$window', '$cookies', '$timeout', '$httpParamSerializer', '$filter', 'ProfileService', 'Challenges', 'Resources'];

    angular
        .module('myApp.profile', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('ProfileController', ProfileController);
})();