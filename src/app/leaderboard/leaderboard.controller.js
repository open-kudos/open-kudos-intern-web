(function () {
    'use strict';
    var LeaderboardController = function ($http, $scope) {

        $scope.topReceivers = true;

    };

    LeaderboardController.$inject = ['$http', '$scope'];

    angular
        .module('myApp.acorn', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('LeaderboardController', LeaderboardController);
})();