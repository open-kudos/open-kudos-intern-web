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
            transactionsReceived = {},
            transactionsGave = {},
            transactionsChallenges = {};
        
        var users = [],
            index;

        var service = {
            getAllTransactions : getAllTransactions,
            getReceivedTransactions : getReceivedTransactions,
            getGaveTransactions : getGaveTransactions,
            getChallengesTransactions : getChallengesTransactions,
            getAll : getUserTransactionsAll,
            setAll : setUserTransactionsAll,
            getReceived : getReceivedUserTransactions,
            setReceived : setReceivedUserTransactions,
            getGave : getGaveUserTransactions,
            setGave : setGaveUserTransactions,
            getChallenges : getChallengesUserTransactions,
            setChallenges : setChallengesUserTransactions
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
        
        function getReceivedTransactions(requestData){
            if (requestData){
                requestData = $httpParamSerializer({
                    userEmail: requestData.email,
                    startingIndex: requestData.start,
                    endingIndex: requestData.end
                });
                return Transaction.getReceivedByEmail(requestData).then(function (val) {
                    return val;
                })
            }
        }
        function getGaveTransactions(requestData) {
            if (requestData){
                requestData = $httpParamSerializer({
                    userEmail: requestData.email,
                    startingIndex: requestData.start,
                    endingIndex: requestData.end
                });
                return Transaction.getGaveByEmail(requestData).then(function (val) {
                    return val;
                })
            }
        }
        
        function getChallengesTransactions(requestData) {
            if (requestData){
                requestData = $httpParamSerializer({
                    userEmail: requestData.email,
                    startingIndex: requestData.start,
                    endingIndex: requestData.end
                });
                return Transaction.getChallengesByEmail(requestData).then(function (val) {
                    return val;
                })
            }
        }

        function getChallengesUserTransactions(data, trigger) {
            if (trigger) {
                if (getTransactions(data.email)) return transactionsChallenges[index];
                else return false;
            } else return false;
        }

        function setChallengesUserTransactions(email, val) {
            setTransactions(email, val, transactionsChallenges)
        }
        
        function getGaveUserTransactions(data, trigger) {
            if (trigger) {
                if (getTransactions(data.email)) return transactionsGave[index];
                else return false;
            } else return false;
        }

        function setGaveUserTransactions(email, val) {
            setTransactions(email, val, transactionsGave)
        }

        function getUserTransactionsAll(data, trigger) {
            if (trigger) {
                if (getTransactions(data.email)) return transactionsAll[index];
                else return false;
            } else return false;
        }
        
        function setUserTransactionsAll(email, val) {
            setTransactions(email, val, transactionsAll)
        }
        
        function getReceivedUserTransactions(data, trigger) {
            if (trigger) {
                if (getTransactions(data.email)) return transactionsReceived[index];
                else return false;
            } else return false;
        }
        
        function setReceivedUserTransactions(email, val) {
            setTransactions(email, val, transactionsReceived)
        }

        function getTransactions(email) {
            var found = false;
            index = null;

            for (var i = 0; i < users.length; i++) {
                if (users[i] == email) {
                    found = true;
                    index = i;
                    break;
                }
            }
            return found;
        }

        function setTransactions(email, data, list) {
            var found = false;

            for (var i = 0; i < users.length; i++){
                if (users[i] == email){
                    list[i] = data;
                    found = true;
                }
            }

            if (!found) {
                list[users.length] = data;
                users[users.length] = email;
            }
        }
    }
})();