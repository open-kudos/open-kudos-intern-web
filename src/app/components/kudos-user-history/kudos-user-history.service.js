/**
 * Created by vytautassugintas on 26/04/16.
 */
(function () {
    "use strict";
    angular.module('myApp.components.userHistory')
        .factory("UserHistoryService", UserHistoryService);

    UserHistoryService.$inject = [
        "$httpParamSerializer",
        "Transaction"
    ];

    function UserHistoryService($httpParamSerializer, Transaction) {
        var service = {
            getAllTransactions : getAllTransactions
        };
        return service;

        function getAllTransactions(requestData) {
            if (requestData){
                requestData = $httpParamSerializer({
                    userEmail: requestData.email,
                    startingIndex: requestData.start,
                    endingIndex: requestData.end
                });
                return Transaction.getAllByEmail(requestData).then(function (val) {
                    return val;
                })
            }
        }

    }
})();