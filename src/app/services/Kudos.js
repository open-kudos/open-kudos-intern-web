(function () {
    "use strict";
    angular.module("myApp")
        .factory("Kudos", Kudos);

    Kudos.$inject = [
        "$http",
        "SERVER"
    ];

    function Kudos($http, SERVER) {

        var kudos = {
            send: sendKudos,
            getSentKudosHistory: getSentKudosHistory,
            getReceivedKudosHistory: getReceivedKudosHistory,
            getKudosHistory: getKudosHistory,
            getUserKudosHistory: getUserKudosHistory,
            getUserReceivedKudosHistory: getUserReceivedKudosHistory,
            getUserSentKudosHistory: getUserSentKudosHistory
        };

        return kudos;

        function sendKudos(requestData) {
            return $http({
                method: 'POST',
                data: requestData,
                url: SERVER.ip + "/kudos/give",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function getSentKudosHistory(requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history/given",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getReceivedKudosHistory(requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history/received",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getKudosHistory(requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getUserKudosHistory(userId, requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history/" + userId,
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getUserReceivedKudosHistory(userId, requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history/received/" + userId,
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getUserSentKudosHistory(userId, requestParams) {
            return $http({
                method: 'GET',
                params: requestParams,
                url: SERVER.ip + "/kudos/history/given/" + userId,
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

    }
})();