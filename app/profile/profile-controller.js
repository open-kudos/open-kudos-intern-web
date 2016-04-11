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

    .controller('profileController', ['$http', '$scope', '$window', '$cookies', 'ProfileService', 'SERVER', function ($http, $scope, $window, $cookies, ProfileService, SERVER) {

        checkUser();

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

        ProfileService.remainingKudos().then(function (val) {
            $scope.userKudos = val;
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
        });

        $scope.updateProfile = function () {
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
        };

        $scope.logout = function () {
            clearCookies();
            ProfileService.logout().catch(function (val) {
                $window.location.href = "#/login";
            });
        };

        $scope.sendKudos = function(){
            var kudosParams = $.param({
                receiverEmail : $scope.sendKudosTo,
                amount: $scope.sendKudosAmount
            });

            ProfileService.send(kudosParams).then(function (val){
                $('#sendKudosModal').modal('hide');
            });

        };

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });

        }

        function clearCookies() {
            $cookies.put('ru', 'false');
            $cookies.put('e', '');
        }



    }]);