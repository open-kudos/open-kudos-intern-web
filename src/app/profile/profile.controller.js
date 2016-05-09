/**
 * Created by vytautassugintas on 06/04/16.
 */
(function () {
    'use strict';
    var ProfileController = function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges, Resources) {
        
        $scope.greeting = "hello";

        $scope.userAvailableKudos = 0;
        $scope.usersCollection = [];
        $scope.buttonDisabled = true;
        $scope.receivedAcorns = false;
        $scope.sentAcorns = true;

        $scope.receiverErrorClass = "";
        $scope.receiverErrorMessage = "";
        $scope.amountErrorClass = "";
        $scope.amountErrorMessage = "";

        $scope.logout = logout;
        $scope.isValid = isValid;

        checkUser();
        registerTooltip();

        ProfileService.userHome().then(function (val) {
            $scope.userEmail = val.email;
            $scope.userName = val.firstName;
            $scope.userSurname = val.lastName;
            $scope.userPhone = val.phone;
            $scope.userPosition = val.position;
            $scope.userLocation = val.location;
            $scope.userTeam = val.team;
            $scope.userStartedToWork = val.startedToWorkDate;
            $scope.userBirthday = val.birthday;
        });

        ProfileService.remainingKudos().then(function (val) {
            Resources.setUserAvailableKudos(val);
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
        });


        ProfileService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        $scope.$watch(function () {
            return Resources.getUserAvailableKudos()
        }, function (newVal) {
            if (!isValid(newVal)) $scope.userAvailableKudos = Resources.getUserAvailableKudos();
        });

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });
        }

        function logout() {
            clearCookies();
            ProfileService.logout().catch(function () {
                $window.location.href = "#/login";
            });
        }

        function clearCookies() {
            $cookies.put('remember_user', 'false');
            $cookies.put('user_credentials', '');
        }

        function isValid(value) {
            return typeof value === "undefined";
        }

        function registerTooltip() {
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
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