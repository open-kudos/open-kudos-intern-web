(function () {
    'use strict';
    var LeaderboardController = function ($http, $scope) {

        $scope.topSenders = true;

    };

    LeaderboardController.$inject = ['$http', '$scope'];

    angular
        .module('myApp.acorn.leaderboard', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('LeaderboardController', LeaderboardController);
})();