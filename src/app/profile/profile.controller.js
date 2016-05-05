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
        .controller('profileController', function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges) {
            var inputChangedPromise;
            var receiverValidated = false;
            var amountValidated = false;
            var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';

            $scope.userAvailableKudos = 0;
            $scope.userReceivedKudos = 0;
            $scope.maxSendKudosLength = $scope.userAvailableKudos;

            $scope.usersCollection = [];
            $scope.buttonDisabled = true;

            $scope.receiverErrorClass = "";
            $scope.receiverErrorMessage = "";
            $scope.amountErrorClass = "";
            $scope.amountErrorMessage = "";

            $scope.logout = logout;
            $scope.sendKudos = sendKudos;
            $scope.giveChallenge = giveChallenge;
            $scope.inputChanged = inputChanged;
            $scope.isValid = isValid;
            $scope.clearSendKudosFormValues = clearSendKudosFormValues;


            $scope.clearChallengeFormValues = clearChallengeFormValues;
            $scope.challengeFormCheck = challengeFormCheck;

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


            ProfileService.listUsers().then(function (val) {
                $scope.usersCollection = val.userList;
            });


            function sendKudos() {
                var sendTo = $httpParamSerializer({
                    receiverEmail: $scope.sendKudosTo,
                    amount: $scope.sendKudosAmount,
                    message: $scope.sendKudosMessage
                });

                ProfileService.send(sendTo).then(function (val) {
                    $scope.showSuccess = true;
                    $scope.userAvailableKudos = $scope.userAvailableKudos - val.data.amount;
                    $('#sendKudosModal').modal('hide');
                    toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                    clearSendKudosFormValues();
                    addTransactionToCollection(val.data);
                }).catch(function () {
                    sendKudosReceiverErrorMessage("Receiver does not exist");
                });
            }

            function addTransactionToCollection(val) {
                var itemToAdd = {
                    receiver: val.receiver,
                    message: val.message,
                    amount: val.amount,
                    timestamp: trimDate(val.timestamp)
                };

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
                $scope.amountErrorMessage = "";
                $scope.amountErrorClass = "";
                $scope.fieldReceiverErrorClass = "";
                $scope.fieldAmountErrorClass = "";
                enableSendKudosButton();
            }

            function clearSendKudosFormValues() {
                $scope.receiverErrorMessage = "";
                $scope.amountErrorMessage = "";
                $scope.sendKudosTo = "";
                $scope.sendKudosAmount = "";
                $scope.sendKudosMessage = "";
                $scope.receiverErrorClass = "";
                $scope.amountErrorClass = "";
                $scope.fieldAmountErrorClass = "";
                $scope.fieldReceiverErrorClass = "";
                disableSendKudosButton();
            }

            function sentKudosTable() {
                if ($scope.outgoingKudosCollection.length > 0)
                    $scope.sentKudosTable = true;
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


            function giveChallenge() {
                var expirationDate = $filter('date')($scope.giveChallengeExpirationDate, requestDateFormat);

                var giveTo = $httpParamSerializer({
                    participant: $scope.giveChallengeTo,
                    referee: $scope.giveChallengeReferee,
                    name: $scope.giveChallengeName,
                    description: $scope.giveChallengeDescription,
                    finishDate: expirationDate,
                    amount: $scope.giveChallengeAmountOfKudos
                });

                var challengeCall = challengeFormCheck();

                if (challengeCall)
                    Challenges.create(giveTo).then(function (val) {
                        clearChallengeFormValues();
                        $('#giveChallengeModal').modal('hide');
                        toastr.success('You successfully challenged ' + val.data.participant + " with " + acornPlural(val.data.amount) + '.' +
                            ' Referee: ' + val.data.referee);
                        $scope.userAvailableKudos -= val.data.amount;
                    }).catch(function () {
                        showChallengeFormErrorMessage("Challenge receiver or referee does not exist");
                    })
            }


            function challengeFormCheck() {
                if ($scope.giveChallengeName == null) {
                    showChallengeFormErrorMessage("Please enter Challenge name");
                    return false;
                } else if ($scope.giveChallengeAmountOfKudos == null) {
                    showChallengeFormErrorMessage("Please enter valid challenge Acorns");
                    return false;
                } else if ($scope.giveChallengeAmountOfKudos > $scope.userAvailableKudos) {
                    showChallengeFormErrorMessage("You don't have enough of Acorns");
                    return false;
                } else if ($scope.giveChallengeTo == null) {
                    showChallengeFormErrorMessage("Please enter challenge receiver");
                    return false;
                } else if ($scope.giveChallengeTo == $scope.userEmail) {
                    showChallengeFormErrorMessage("You can't challenge yourself");
                    return false;
                } else if ($scope.giveChallengeReferee == null) {
                    showChallengeFormErrorMessage("Please enter challenge referee");
                    return false;
                } else if ($scope.giveChallengeReferee == $scope.userEmail) {
                    showChallengeFormErrorMessage("You can't be challenge referee");
                    return false;
                } else if ($scope.giveChallengeTo == $scope.giveChallengeReferee) {
                    showChallengeFormErrorMessage("Challenge receiver can't be challenge referee");
                    return false;
                } else return true;
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

            function enableChallengeButton() {
                $scope.challengeButtonDisabled = false;
            }

            function disableChallengeButton() {
                $scope.challengeButtonDisabled = true;
            }

            function clearChallengeFormValues() {
                $scope.giveChallengeTo = null;
                $scope.giveChallengeReferee = null;
                $scope.giveChallengeName = null;
                $scope.giveChallengeDescription = null;
                $scope.giveChallengeExpirationDate = null;
                $scope.giveChallengeAmountOfKudos = null;
                disableChallengeButton();
            }

            function isValid(value) {
                return typeof value === "undefined";
            }

            function validateEmail(email) {
                var reg = /[@]swedbank.[a-z]{2,}/;
                return reg.test(email);
            }

            function showSendKudosErrorMessage(message) {
                $scope.errorClass = "error-message";
                $scope.sendKudosErrorMessage = message;
                disableSendKudosButton();
            }

            function showSendKudosSuccessMessage(message) {
                $scope.errorClass = "success-message";
                $scope.sendKudosErrorMessage = message;
                enableSendKudosButton();
            }

            function showChallengeFormErrorMessage(message) {
                $scope.errorClass = "error-message";
                $scope.challengeFormErrorMessage = message;
            }

            function showChallengeFormSuccessMessage(message) {
                $scope.errorClass = "success-message";
                $scope.challengeFormErrorMessage = message;
            }

            function pushOutgoingTransferIntoCollection(val) {
                var itemToAdd = {
                    receiver: val.receiver,
                    message: val.message,
                    amount: val.amount,
                    timestamp: trimDate(val.timestamp)
                };
                $scope.outgoingKudosCollection.push(itemToAdd);
                sentKudosTable();
                showMoreOutgoingKudosButton($scope.outgoingKudosCollection);
            }

            function acornPlural(amount) {
                return amount > 1 ? amount + " Acorns" : amount + " Acorn"
            }

            function trimDate(dateString) {
                return dateString.substring(0, 16);
            }

            function registerTooltip() {
                $(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        });
})();