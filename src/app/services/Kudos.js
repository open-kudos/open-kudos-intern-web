/**
 * Created by vytautassugintas on 09/04/16.
 */
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
        incoming: getIncomingKudos,
        outgoing: getOutgoingKudos,
        remaining: getRemainingKudos,
        received: getReceivedKudos,
        feed: getKudosTransactionStream,
        feedChanged: kudosTransactionListChanged,
        getCompletedKudosTransactions : getCompletedKudosTransactions,
    }

    kudos.outgoingKudosCollection = [];

    return kudos;

    function sendKudos(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/kudos/send?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function getIncomingKudos() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/kudos/incoming",
            withCredentials: true
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getOutgoingKudos() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/kudos/outgoing",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getRemainingKudos() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/kudos/remaining",
            withCredentials: true
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getReceivedKudos() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/kudos/received",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

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