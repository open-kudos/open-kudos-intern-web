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

    .controller('profileController', function ($http, $scope, $window, $cookies, ProfileService) {

        checkUser();

        $scope.incomingKudosCollection = [];
        $scope.updateProfile = updateProfile;
        $scope.logout = logout;
        $scope.sendKudos = sendKudos;

        ProfileService.userHome().then(function (val) {
            var user = val.user;
            $scope.userEmail = user.email;
            $scope.userName = user.firstName;
            $scope.userSurname = user.lastName;
            $scope.userPhone = user.phone;
            $scope.userPosition = user.position;
            $scope.userLocation = user.location;
            $scope.userTeam = user.team;
            $scope.userStartedToWork = user.startedToWorkDate;
            $scope.userBirthday = user.birthday;
        });

        //TEST TODO DLETE

        ProfileService.remainingKudos().then(function (val) {
            $scope.userKudos = val;
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
        });

        ProfileService.incomingKudos().then(function (val) {
            $scope.incomingKudosCollection = val;
        });

        function updateProfile() {
            var updateInfo = $.param({
                birthday: this.birthday,
                department: this.department,
                location: this.location,
                phone: "",                                  // <-- TODO FIX PHONE
                position: this.position,
                startToWork: this.startToWork,
                team: this.team
            });
            ProfileService.update(updateInfo).then(function (val) {
                $('#userDetailsModal').modal('hide');
                checkUser();
            })
        }

        function logout() {
            clearCookies();
            ProfileService.logout().catch(function (val) {
                $window.location.href = "#/login";
            });
        }

        function sendKudos() {
            ProfileService.send(getSendKudosPopupParams()).then(function (val) {
                $('#sendKudosModal').modal('hide');
            });
        }

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });
        }

        function getSendKudosPopupParams() {
            return $.param({
                receiverEmail: $scope.sendKudosTo,
                amount: $scope.sendKudosAmount
            });
        }

        function clearCookies() {
            $cookies.put('ru', 'false');
            $cookies.put('e', '');
        }

    });