/**
 * Created by vytautassugintas on 10/05/16.
 */
/**
 * Created by vytautassugintas on 06/04/16.
 */
(function () {
    'use strict';
    var AcornController = function ($http, $scope, $window, $cookies, $timeout, $httpParamSerializer, $filter, ProfileService, Challenges, Resources) {

        $scope.greeting = "hello";

        $scope.showLoader = true;

        $scope.userAvailableKudos = 0;
        $scope.buttonDisabled = true;

        $scope.receivedAcorns = false;
        $scope.sentAcorns = true;

        $scope.isValid = isValid;
        $scope.checkUser = checkUser;

        checkUser();

        ProfileService.remainingKudos().then(function (val) {
            Resources.setUserAvailableKudos(val);
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
            $scope.showLoader = false;
        });

        $scope.$watch(function () {
            return Resources.getUserAvailableKudos()
        }, function (newVal) {
            if (!isValid(newVal)) $scope.userAvailableKudos = Resources.getUserAvailableKudos();
        });

        function isValid(value) {
            return typeof value === "undefined";
        }

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/acorns" : $window.location.href = "#/login";
            });
        }
    };

    AcornController.$inject = ['$http', '$scope', '$window', '$cookies', '$timeout', '$httpParamSerializer', '$filter', 'ProfileService', 'Challenges', 'Resources'];

    angular
        .module('myApp.acorn', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('AcornController', AcornController);
})();