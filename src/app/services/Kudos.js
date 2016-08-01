(function() {
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
        feed: getKudosTransactionStream,
        feedChanged: kudosTransactionListChanged,
        getCompletedKudosTransactions : getCompletedKudosTransactions,

        getReceivedKudosHistory: getReceivedKudosHistory,
        getSentKudosHistory: getSentKudosHistory
    }
    
    kudos.outgoingKudosCollection = [];

    return kudos;

    /**
     * V2
     */

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

    /**
     * V2
     */

     function getKudosTransactionStream(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/transaction/feedPaged?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getCompletedKudosTransactions() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/transaction/transactions?status=COMPLETED&page=0&pageSize=10",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function kudosTransactionListChanged(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/transaction/kudosFeedPool?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }
}
})();