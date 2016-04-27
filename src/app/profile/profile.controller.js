/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular
    .module('myApp.profile', [
        'ngRoute',
        'ngCookies'
    ])

    .filter('getByProperty', function() {
        return function(propertyName, propertyValue, collection) {
            var i=0, len=collection.length;
            for (; i<len; i++) {
                if (collection[i][propertyName] == propertyValue) {
                    return collection[i];
                }
            }
            return null;
        }
    })

    .controller('profileController', function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService) {
        var inputChangedPromise;
        var showMoreLimit = 5;
        var errorMessage = "";

        $scope.userAvailableKudos = 0;
        $scope.userReceivedKudos = 0;
        $scope.sendKudosErrorMessage = "Please enter receiver and amount";
        $scope.incomingKudosShowLimit = 5;
        $scope.outgoingKudosShowLimit = 5;
        $scope.maxSendKudosLength = $scope.userAvailableKudos;
        $scope.incomingKudosCollection = [];
        $scope.outgoingKudosCollection = [];
        $scope.givenChallengesCollection = [];
        $scope.usersCollection = [];
        $scope.buttonDisabled = true;

        $scope.updateProfile = updateProfile;
        $scope.logout = logout;
        $scope.sendKudos = sendKudos;
        $scope.giveChallenge = giveChallenge;
        $scope.inputChanged = inputChanged;
        $scope.kudosValidation = kudosValidation;
        $scope.isValid = isValid;
        $scope.clearSendKudosFormValues = clearSendKudosFormValues;
        $scope.showMoreIncomingKudos = showMoreIncomingKudos;
        $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;
        $scope.showLessIncomingKudos = showLessIncomingKudos;
        $scope.showLessOutgoingKudos = showLessOutgoingKudos;
        $scope.showMoreIncomingKudosButton = showMoreIncomingKudosButton;
        $scope.showMoreOutgoingKudosButton = showMoreOutgoingKudosButton;
        $scope.showMoreInfo = showMoreInfo;


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

        ProfileService.givenChallenges().then(function (val) {
            $scope.givenChallengesCollection = val;
        })

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

        function showMoreInfo(challengeId) {
            var found = $filter('getByProperty')("id", challengeId, $scope.givenChallengesCollection);
            $scope.showMore = JSON.stringify(found);


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
                errorMessage == "" ? showSendKudosErrorMessage("Receiver does not exist") : showSendKudosErrorMessage(errorMessage)
            });
        }

        function giveChallenge() {

        }

        function kudosValidation() {
            $scope.errorClass = "error-message";
            if ($scope.sendKudosAmount > $scope.userAvailableKudos) {
                showSendKudosErrorMessage("You don't have enough Acorns");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
                disableSendKudosButton();
            } else if ($scope.sendKudosAmount == null) {
                showSendKudosErrorMessage("Please enter amount");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
                disableSendKudosButton();
            } else if ($scope.sendKudosAmount <= 0) {
                showSendKudosErrorMessage("Please enter more than zero");
                $scope.sendKudosForm.sendKudosAmount.$invalid = true;
                disableSendKudosButton();
            } else if ($scope.sendKudosTo == null) {
                showSendKudosErrorMessage("Please enter receiver");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
                disableSendKudosButton();
            } else if (!validateEmail($scope.sendKudosTo)) {
                showSendKudosErrorMessage("Please enter valid receiver email");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
                disableSendKudosButton();
            } else if ($scope.sendKudosTo === $scope.userEmail) {
                showSendKudosErrorMessage("Can't send kudos to yourself");
                $scope.sendKudosForm.sendKudosTo.$invalid = true;
                disableSendKudosButton();
            } else {
                errorMessage = "";
                showSendKudosSuccessMessage("");
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
            var re = /[@]swedbank.[a-z]{2,}/;
            //    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
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
            var length = 16;
            var trimmedString = dateString.substring(0, length);
            console.log(trimmedString);
            return trimmedString;
        }

        function registerTooltip() {
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    });