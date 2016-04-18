/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular.module('myApp.profile', ['ngRoute', 'ngCookies', 'angucomplete'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'profileController'
        });
    }])
    .controller('profileController', function ($http, $scope, $rootScope, $window, $cookies, $timeout, $httpParamSerializer, ProfileService) {
        checkUser();

        var inputChangedPromise;

        $rootScope.userKudos = 0;
        $rootScope.sendKudosErrorMessage = "Please enter receiver and amount";

        $scope.incomingKudosShowLimit = 3;
        $scope.outgoingKudosShowLimit = 3;
        $scope.incomingKudosCollection = [];
        $scope.outgoingKudosCollection = [];
        $scope.usersCollection = [];
        $scope.buttonDisabled = true;

        $scope.updateProfile = updateProfile;
        $scope.logout = logout;
        $scope.sendKudos = sendKudos;
        $scope.inputChanged = inputChanged;
        $scope.kudosValidation = kudosValidation;
        $scope.isValid = isValid;
        $scope.showMoreIncomingKudos = showMoreIncomingKudos;
        $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;

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
            $rootScope.userKudos = val;
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
        });

        ProfileService.incomingKudos().then(function (val) {
            $scope.incomingKudosCollection = val;
        });

        ProfileService.outgoingKudos().then(function (val) {
            $scope.outgoingKudosCollection = val;
        });

        ProfileService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        function showMoreIncomingKudos() {
            if ($scope.incomingKudosShowLimit === 3) {
                $scope.incomingKudosShowLimit = $scope.incomingKudosCollection.length;
                $scope.showMoreButton = false;
            } else {
                $scope.incomingKudosShowLimit = 3;
                $scope.showLessButton = true;
            }
        }

        function showMoreOutgoingKudos() {
            if ($scope.outgoingKudosShowLimit === 3) {
                $scope.outgoingKudosShowLimit = $scope.outgoingKudosShowLimit.length;
            } else {
                $scope.outgoingKudosShowLimit = 3;
            }
        }

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

        function sendKudos() {
            var sendTo = $httpParamSerializer({
                receiverEmail: $scope.sendKudosTo,
                amount: $scope.sendKudosAmount,
                message: $scope.sendKudosMessage
            });

            ProfileService.send(sendTo).then(function (val) {
                $('#sendKudosModal').modal('hide');
                $('#successSendKudosModal').modal('show');
                $rootScope.userKudos = $rootScope.userKudos - val.data.amount;
                clearSendKudosFormValues();
            }).catch(function (val) {
                $scope.errorClass = "error-message";
                $rootScope.sendKudosErrorMessage = "Receiver does not exist";
                if (val.status === 400) {
                    $rootScope.sendKudosErrorMessage = "Enter receiver";
                }
                if (val.status === 500) {
                    $rootScope.sendKudosErrorMessage = "Enter amount";
                }
            });
        }

        function inputChanged() {
            if (inputChangedPromise) {
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout(kudosValidation, 500);
        }

        function kudosValidation() {
            $scope.errorClass = "error-message";
            if ($scope.sendKudosAmount > $scope.userKudos) {
                $rootScope.sendKudosErrorMessage = "You don't have enough Acorns";
                disableSendKudosButton();
            } else if ($scope.sendKudosAmount == null || $scope.sendKudosAmount <= 0) {
                $rootScope.sendKudosErrorMessage = "Please enter amount";
                $scope.sendKudosAmountClass = "notValid";
                disableSendKudosButton();
            } else if ($scope.sendKudosTo == null) {
                $scope.sendKudosToClass = "notValid";
                $rootScope.sendKudosErrorMessage = "Please enter receiver"
            } else if (!validateEmail($scope.sendKudosTo)) {
                $scope.sendKudosToClass = "notValid";
                $rootScope.sendKudosErrorMessage = "Please enter valid receiver email"
            } else {
                $scope.errorClass = "success-message";
                $scope.sendKudosToClass = "";
                $scope.sendKudosAmountClass = "";
                $rootScope.sendKudosErrorMessage = "Ok, you'r good to go!";
                enableSendKudosButton();
            }
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

        function clearSendKudosFormValues(){
            $scope.sendKudosTo = "";
            $scope.sendKudosAmount = "";
            $scope.sendKudosMessage = "";
            $rootScope.sendKudosErrorMessage = "Please enter receiver and amount";
        }

        function isValid(value) {
            return typeof value === "undefined";
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function enableSendKudosButton() {
            $scope.buttonDisabled = false;
        }

        function disableSendKudosButton() {
            $scope.buttonDisabled = true;
        }

    });