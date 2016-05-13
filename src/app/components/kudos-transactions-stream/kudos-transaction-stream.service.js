/**
 * Created by vytautassugintas on 26/04/16.
 */
(function () {
    "use strict";
    angular.module('myApp.components.transactions')
        .factory("KudosTransactionService", KudosTransactionService);

    KudosTransactionService.$inject = [
        "$httpParamSerializer",
        "Transaction"
    ];

    function KudosTransactionService($httpParamSerializer, transactionsBackend) {
        var lastTransactionTimestamp;

        var service = {
            poll: PollTransactions,
            getCompletedKudosTransactions: GetCompletedTransactions,
            setTimestamp : setTimestamp
        };
        return service;

        function GetCompletedTransactions(requestData) {
            if (requestData != undefined){
            return transactionsBackend.getCompletedKudosTransactions(requestData).then(function (val) {
                lastTransactionTimestamp = $httpParamSerializer({
                    lastTransactionTimestamp: val[0].timestamp
                });
                return val;
            })
            }
        }

        function PollTransactions() {
            return transactionsBackend.feedChanged(lastTransactionTimestamp).then(function (val) {
                if (val === true) GetCompletedTransactions();
                return val;
            });
        }

        function setTimestamp(timestamp) {
            lastTransactionTimestamp = timestamp;
        }

    }
})();