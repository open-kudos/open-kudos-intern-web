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
            getNewTransactions: getNewTransactions
        };
        return service;

        function getNewTransactions(requestData) {
            return transactionBackend.getNewTransactions(requestData)
        }
    }
})();