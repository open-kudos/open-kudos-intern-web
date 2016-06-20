/**
 * Created by vytautassugintas on 09/05/16.
 */
(function () {
    "use strict";
    angular.module("myApp.components.notifications")
        .factory("KudosNotificationService", KudosNotificationService);

    KudosNotificationService.$inject = [
        "Transaction"
    ];

    function KudosNotificationService(transactionBackend) {
        var service = {
            getNewTransactions: getNewTransactions,
            setLastTransaction: setLastSeenTransaction
        };
        return service;

        function getNewTransactions() {
            return transactionBackend.getNewTransactions()
        }

        function setLastSeenTransaction(timestamp) {
            console.log(transactionBackend.setLastSeenTransactionTimestamp(timestamp));
            return transactionBackend.setLastSeenTransactionTimestamp(timestamp)
        }
    }
})();