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
            return transactionBackend.setLastSeenTransactionTimestamp(timestamp)
        }
    }
})();