/**
 * Created by vytautassugintas on 06/04/16.
 */
(function () {
    'use strict';
    angular
        .module('myApp.profile', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('profileController', function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges, Resources) {
            $scope.userAvailableKudos = 0;
            $scope.userReceivedKudos = 0;
            $scope.maxSendKudosLength = $scope.userAvailableKudos;

            $scope.$watch(function () { return Resources.getUserAvailableKudos() }, function (newVal) {
                if (typeof newVal !== 'undefined') {
                    $scope.userAvailableKudos = Resources.getUserAvailableKudos();
                }
            });

            $scope.usersCollection = [];
            $scope.buttonDisabled = true;

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


            function updateProfile() {
                var updateInfo = $.param({
                    birthday: this.birthday,
                    department: this.department,
                    location: this.location,
                    phone: "",              // <-- TODO FIX PHONE
                    position: this.position,
                    startToWork: this.startToWork,
                    team: this.team
                });
                ProfileService.update(updateInfo).then(function (val) {
                    $('#userDetailsModal').modal('hide');
                    checkUser();
                })
            }

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
        });
})();