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

            var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';

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
            $scope.giveChallenge = giveChallenge;
            $scope.isValid = isValid;

            $scope.clearChallengeFormValues = clearChallengeFormValues;
            $scope.challengeFormCheck = challengeFormCheck;

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
                } else if ($scope.giveChallengeAmountOfKudos > Resources.getUserAvailableKudos()) {
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


            function showChallengeFormErrorMessage(message) {
                $scope.errorClass = "error-message";
                $scope.challengeFormErrorMessage = message;
            }

            function showChallengeFormSuccessMessage(message) {
                $scope.errorClass = "success-message";
                $scope.challengeFormErrorMessage = message;
            }

            function registerTooltip() {
                $(document).ready(function () {
                    $('[data-toggle="tooltip"]').tooltip();
                });
            }
        });
})();