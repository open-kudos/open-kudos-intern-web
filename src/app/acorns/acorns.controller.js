(function () {
    angular
        .module('myApp.acorn', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('AcornController', AcornController);
        'use strict';

        AcornController.$inject = ['$scope', '$window', 'ProfileService', 'Resources'];

        function AcornController($scope, $window, ProfileService, Resources) {
            $scope.showLoader = true;

            $scope.checkUser = checkUser;

            function activate() {
                checkUser();
                if ($scope.user == undefined) {
                    ProfileService.userHome().then(function (user) {
                        Resources.setCurrentUser(user);
                        $scope.user = Resources.getCurrentUser();
                        $scope.user.$$hashKey = "0:0";
                    });
                } else {
                    $scope.user = Resources.getCurrentUser();
                    $scope.user.$$hashKey = "0:0";
                }
            }
            activate();

            $scope.$watch(function () {
                return Resources.getUserAvailableKudos()
            }, function (newVal) {
                if (!isValid(newVal)) $scope.userAvailableKudos = Resources.getUserAvailableKudos();
            });

            function checkUser() {
                ProfileService.checkUser().then(function (val) {
                    val.logged ? $window.location.href = "#/acorns" : $window.location.href = "#/login";
                });
            }
        }


    })();