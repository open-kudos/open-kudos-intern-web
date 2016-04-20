/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular.module('myApp.profile', ['ngRoute', 'ngCookies', 'ngAnimate', 'angucomplete'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'profileController'
        });
    }])
    .controller('profileController', function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, ProfileService) {
        checkUser();

        var inputChangedPromise;

        $scope.userAvailableKudos = 0;
        $scope.userReceivedKudos = 0;
        $scope.sendKudosErrorMessage = "Please enter receiver and amount";
        $scope.incomingKudosShowLimit = 3;
        $scope.outgoingKudosShowLimit = 3;
        $scope.maxSendKudosLength = $scope.userAvailableKudos;
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
        $scope.clearSendKudosFormValues = clearSendKudosFormValues;
        $scope.showMoreIncomingKudos = showMoreIncomingKudos;
        $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;

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
            $scope.userAvailableKudos = val;
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
            if ($scope.incomingKudosShowLimit <= $scope.incomingKudosCollection.length) {
                $scope.incomingKudosShowLimit += 5;
            } else {
                $scope.incomingKudosShowLimit = 3;
            }
        }

        function showMoreOutgoingKudos() {
            if ($scope.outgoingKudosShowLimit <= $scope.outgoingKudosCollection.length) {
                $scope.outgoingKudosShowLimit += 5;
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
                $scope.showSendKudosModal = false;
                $scope.showSuccess = true;
                $scope.userAvailableKudos = $scope.userAvailableKudos - val.data.amount;
                $('#sendKudosModal').modal('hide');
                toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                pushOutgoingTransferIntoCollection(val.data);
                clearSendKudosFormValues();
            }).catch(function () {
                showSendKudosErrorMessage("Receiver does not exist");
            });
        }

        function kudosValidation() {
            $scope.errorClass = "error-message";
            if ($scope.sendKudosAmount > $scope.userAvailableKudos
            ) {
                showSendKudosErrorMessage("You don't have enough Acorns");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
            } else if ($scope.sendKudosAmount == null) {
                showSendKudosErrorMessage("Please enter amount");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
            } else if ($scope.sendKudosAmount <= 0) {
                showSendKudosErrorMessage("Please enter more than zero");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
            } else if ($scope.sendKudosTo == null) {
                showSendKudosErrorMessage("Please enter receiver");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
            } else if (!validateEmail($scope.sendKudosTo)) {
                showSendKudosErrorMessage("Please enter valid receiver email");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
            } else if ($scope.sendKudosTo === $scope.userEmail) {
                showSendKudosErrorMessage("Can't send kudos to yourself");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
            } else {
                showSendKudosSuccessMessage("Ok, you'r good to go!");
            }
        }

        function inputChanged() {
            if (inputChangedPromise) {
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout(kudosValidation, 100);
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

        function enableSendKudosButton() {
            $scope.buttonDisabled = false;
        }

        function disableSendKudosButton() {
            $scope.buttonDisabled = true;
        }

        function isValid(value) {
            return typeof value === "undefined";
        }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function showSendKudosErrorMessage(message) {
            $scope.sendKudosErrorMessage = message;
            disableSendKudosButton();
        }

        function showSendKudosSuccessMessage(message) {
            $scope.errorClass = "success-message";
            $scope.sendKudosErrorMessage = message;
            enableSendKudosButton();
        }

        function clearSendKudosFormValues() {
            $scope.sendKudosTo = "";
            $scope.sendKudosAmount = "";
            $scope.sendKudosMessage = "";
            $scope.errorClass = "error-message";
            $scope.sendKudosErrorMessage = "Please enter receiver and amount";
            disableSendKudosButton();
        }

        function pushOutgoingTransferIntoCollection(val) {
            var itemToAdd = {
                receiver: val.receiver,
                message: val.message,
                amount: val.amount,
                timestamp: val.timestamp
            };
            $scope.outgoingKudosCollection.push(itemToAdd);
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }


    });