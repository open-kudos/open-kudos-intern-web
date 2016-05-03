/**
 * Created by vytautassugintas on 09/04/16.
 */
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
        getCompletedKudosTransactions : getCompletedKudosTransactions
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