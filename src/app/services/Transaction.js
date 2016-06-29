(function() {
"use strict";
angular.module("myApp")
    .factory("Transaction", Transaction);

Transaction.$inject = [
    "$http",
    "SERVER"
];

function Transaction($http, SERVER) {
    var transaction = {
        feedChanged: kudosTransactionListChanged,
        getCompletedKudosTransactions : getCompletedKudosTransactions,
        getNewTransactions : getNewKudosTransactions,
        setLastSeenTransactionTimestamp : setLastSeenTransactionTimestamp,
        getAllByEmail : getAllByEmail,
        getReceivedByEmail : getReceivedByEmail,
        getGaveByEmail : getGaveByEmail,
        getChallengesByEmail : getChallengesByEmail
    }
    return transaction;

    function getCompletedKudosTransactions(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/transaction/transactions?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getNewKudosTransactions() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/transaction/newTransactions",
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

    function setLastSeenTransactionTimestamp(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/transaction/timestamp?timestamp=" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getAllByEmail(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/history/all?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getReceivedByEmail(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/history/received?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getGaveByEmail(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/history/gave?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }
    
    function getChallengesByEmail(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/history/challenges?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }
}
})();