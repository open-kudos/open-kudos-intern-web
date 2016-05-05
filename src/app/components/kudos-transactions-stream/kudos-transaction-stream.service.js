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
            getCompletedKudosTransactions: GetCompletedTransactions
        };
        return service;

        function PollTransactions() {
            return transactionsBackend.feedChanged(lastTransactionTimestamp).then(function (val) {
                if (val === true) GetCompletedTransactions();
                return val;
            });
        }

        function GetCompletedTransactions(requestData) {
            return transactionsBackend.getCompletedKudosTransactions(requestData).then(function (val) {
                lastTransactionTimestamp = $httpParamSerializer({
                    lastTransactionTimestamp: val[0].timestamp
                });
                return val;
            })
        }

    }
})();