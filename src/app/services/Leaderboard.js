(function () {
    "use strict";
    angular.module("myApp")
        .factory("Leaderboard", Leaderboard);

    Leaderboard.$inject = [
        "$http",
        "SERVER"
    ];

    function Leaderboard($http, SERVER) {
        var user = {
            getTopReceivers: getTopReceivers,
            getTopSenders: getTopSenders,
        }
        return user;

        function getTopReceivers(requestData) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: SERVER.ip + "/leaderboard/receivers?" + requestData
            }).then(function (response) {
                return response.data;
            })
        }

        function getTopSenders(requestData) {
            return $http({
                method: 'GET',
                withCredentials: true,
                url: SERVER.ip + "/leaderboard/senders?" + requestData
            }).then(function (response) {
                return response.data;
            })
        }

    }
})();