(function () {
    'use strict';
    var NotificationController = function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges, Resources) {
        $scope.userAvailableKudos = 0;
        $scope.usersCollection = [];
        $scope.buttonDisabled = true;

        $scope.receivedAcorns = false;
        $scope.sentAcorns = true;

        $scope.showDropDown = false;

        $scope.receiverErrorClass = "";
        $scope.receiverErrorMessage = "";
        $scope.amountErrorClass = "";
        $scope.amountErrorMessage = "";

        $scope.notificationsCollection = Resources.getNotificationsTransactionCollection();

        $scope.logout = logout;
        $scope.isValid = isValid;
        $scope.acornPlural = acornPlural;

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

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    NotificationController.$inject = ['$http', '$scope', '$window', '$cookies', '$timeout', '$httpParamSerializer', '$filter', 'ProfileService', 'Challenges', 'Resources'];

    angular
        .module('myApp.notification', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('NotificationController', NotificationController);
})();