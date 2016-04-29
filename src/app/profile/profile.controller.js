/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular
    .module('myApp.profile', [
        'ngRoute',
        'ngCookies'
    ])
    .controller('profileController', function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, ProfileService) {
        var inputChangedPromise;
        var receiverValidated = false;
        var amountValidated = false;
        var showMoreLimit = 5;

        $scope.userAvailableKudos = 0;
        $scope.userReceivedKudos = 0;
        $scope.incomingKudosShowLimit = 5;
        $scope.outgoingKudosShowLimit = 5;
        $scope.maxSendKudosLength = $scope.userAvailableKudos;
        $scope.incomingKudosCollection = [];
        $scope.outgoingKudosCollection = [];
        $scope.usersCollection = [];
        $scope.buttonDisabled = true;

        $scope.receiverErrorClass = "";
        $scope.receiverErrorMessage = "";
        $scope.amountErrorClass = "";
        $scope.amountErrorMessage = "";

        $scope.logout = logout;
        $scope.sendKudos = sendKudos;
        $scope.inputChanged = inputChanged;
        $scope.isValid = isValid;
        $scope.clearSendKudosFormValues = clearSendKudosFormValues;
        $scope.showMoreIncomingKudos = showMoreIncomingKudos;
        $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;
        $scope.showLessIncomingKudos = showLessIncomingKudos;
        $scope.showLessOutgoingKudos = showLessOutgoingKudos;
        $scope.showMoreIncomingKudosButton = showMoreIncomingKudosButton;
        $scope.showMoreOutgoingKudosButton = showMoreOutgoingKudosButton;

        checkUser();
        registerTooltip();

        /**
         * Send kudos modal receiver input
         * field auto complete
         */
        $scope.autocompleteHide = true;

        $scope.selectAutoText = function (text) {
            $scope.sendKudosTo = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
            sendKudosValidation();
        };

        $scope.$watch('sendKudosTo', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    if (newVal.length > 1) {
                        $scope.autocompleteHide = false;
                    } else {
                        $scope.autocompleteHide = true;
                    }
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });

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
            showMoreIncomingKudosButton(val);
            receivedKudosTable();
        });

        ProfileService.outgoingKudos().then(function (val) {
            $scope.outgoingKudosCollection = val;
            showMoreOutgoingKudosButton(val);
            sentKudosTable();
        });

        ProfileService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        function showMoreIncomingKudosButton(val) {
            if (val.length > 5) {
                $scope.moreIncoming = true;
            }
        }

        function showMoreOutgoingKudosButton(val) {
            if (val.length > 5) {
                $scope.moreOutgoing = true;
            }
        }

        function showMoreIncomingKudos() {
            if ($scope.incomingKudosShowLimit <= $scope.incomingKudosCollection.length) {
                $scope.incomingKudosShowLimit += showMoreLimit;
            }
        }

        function showMoreOutgoingKudos() {
            if ($scope.outgoingKudosShowLimit <= $scope.outgoingKudosCollection.length) {
                $scope.outgoingKudosShowLimit += showMoreLimit;
            }
        }

        function showLessOutgoingKudos() {
            $scope.outgoingKudosShowLimit = showMoreLimit;
        }

        function showLessIncomingKudos() {
            $scope.incomingKudosShowLimit = showMoreLimit;
        }

        function sentKudosTable() {
            if ($scope.outgoingKudosCollection.length > 0)
                $scope.sentKudosTable = true;
        }

        function receivedKudosTable() {
            if ($scope.incomingKudosCollection.length > 0)
                $scope.receivedKudosTable = true;
        }

        function sendKudos() {
            var sendTo = $httpParamSerializer({
                receiverEmail: $scope.sendKudosTo,
                amount: $scope.sendKudosAmount,
                message: $scope.sendKudosMessage});

            ProfileService.send(sendTo).then(function (val) {
                $scope.showSendKudosModal = false;
                $scope.showSuccess = true;
                $scope.userAvailableKudos = $scope.userAvailableKudos - val.data.amount;
                $('#sendKudosModal').modal('hide');
                toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                addTransactionToCollection(val.data);
                clearSendKudosFormValues();
            }).catch(function () {
                sendKudosReceiverErrorMessage("Receiver does not exist");
            });
        }

        function addTransactionToCollection(val) {
            var itemToAdd = {
                receiver: val.receiver,
                message: val.message,
                amount: val.amount,
                timestamp: trimDate(val.timestamp)};

            $scope.outgoingKudosCollection.push(itemToAdd);
            sentKudosTable();
            showMoreOutgoingKudosButton($scope.outgoingKudosCollection);
        }

        function sendKudosValidation() {
            clearErrorMessages();
            if ($scope.sendKudosTo == null) {
                sendKudosReceiverErrorMessage("Please enter receiver");
            } else if (!validateEmail($scope.sendKudosTo)) {
                sendKudosReceiverErrorMessage("Please enter valid receiver email");
            } else if ($scope.sendKudosTo === $scope.userEmail) {
                sendKudosReceiverErrorMessage("Can't send kudos to yourself");
            } else if ($scope.sendKudosAmount > $scope.userAvailableKudos) {
                sendKudosAmountErrorMessage("You don't have enough Acorns");
            } else if ($scope.sendKudosAmount == null) {
                sendKudosAmountErrorMessage("Please enter amount");
            } else if ($scope.sendKudosAmount <= 0) {
                sendKudosAmountErrorMessage("Please enter more than zero");
            } else {
                clearErrorMessages();
            }
        }

        function inputChanged() {
            if (inputChangedPromise) $timeout.cancel(inputChangedPromise);
            inputChangedPromise = $timeout(sendKudosValidation(), 100);
        }

        function sendKudosReceiverErrorMessage(message) {
            $scope.receiverErrorClass = "error-message";
            $scope.fieldReceiverErrorClass = "invalid";
            $scope.receiverErrorMessage = message;
            receiverValidated = false;
            disableSendKudosButton();
        }

        function sendKudosAmountErrorMessage(message) {
            $scope.amountErrorClass = "error-message";
            $scope.fieldAmountErrorClass = "invalid";
            $scope.amountErrorMessage = message;
            amountValidated = false;
            disableSendKudosButton();
        }

        function clearErrorMessages() {
            $scope.receiverErrorMessage = "";
            $scope.receiverErrorClass = "";
            $scope.fieldReceiverErrorClass = "";
            $scope.amountErrorMessage = "";
            $scope.amountErrorClass = "";
            $scope.fieldAmountErrorClass = "";
            enableSendKudosButton();
        }

        function clearSendKudosFormValues() {
            $scope.receiverErrorMessage = "";
            $scope.amountErrorMessage = "";
            $scope.receiverErrorClass = "";
            $scope.amountErrorClass = "";
            $scope.fieldAmountErrorClass = "";
            $scope.fieldReceiverErrorClass = "";
            $scope.sendKudosTo = "";
            $scope.sendKudosAmount = "";
            $scope.sendKudosMessage = "";
            disableSendKudosButton();
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
            var re = /[@]swedbank.[a-z]{2,}/;
            return re.test(email);
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

        function trimDate(dateString) {
            var length = 16;
            var trimmedString = dateString.substring(0, length);
            return trimmedString;
        }

        function registerTooltip() {
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    });