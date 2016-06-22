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
        var transactionsAll = {},
            users = [];

        var service = {
            getAllTransactions : getAllTransactions,
            checkAll : checkUserTransactionsAll,
            setAll : setUserTransactionsAll
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

        function checkUserTransactionsAll(data) {
            var found = false;
            var index = null;

            for(var i = 0; i < users.length; i++){
                if (users[i] == data.email){
                    found = true;
                    index = i;
                    break;
                }
            }

            if (found) return transactionsAll[index];
            else return false;
        }
        
        function setUserTransactionsAll(email, val) {
            transactionsAll[users.length] = val;
            users[users.length] = email;
        }
    }
})();