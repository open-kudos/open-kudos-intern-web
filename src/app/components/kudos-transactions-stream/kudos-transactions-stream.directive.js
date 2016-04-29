/**
 * Created by vytautassugintas on 25/04/16.
 */
angular.module('myApp.components', [])
    .directive('kudosTransactionsStream', function () {
        return {
            controller: 'KudosTransactionController',
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/kudos-transactions-stream/kudos-transactions-stream.html'
        }
    })
    .controller('KudosTransactionController', function ($scope, $timeout, $httpParamSerializer, ProfileService, KudosTransactionService) {

        $scope.transactionCollection = [];

        $scope.acornPlural = acornPlural;
        $scope.getKudosTransactionsFeed = getKudosTransactionsFeed;
        $scope.changeTransactionsList = changeTransactionsList;

        getKudosTransactionsFeed();

        /**
         * Pooling REST call with 5 seconds timeout
         */
        $scope.startPooling = function () {
            KudosTransactionService.poll().then(function (transactionChanged) {
                if (transactionChanged === true) changeTransactionsList();
            });
            pooling = $timeout($scope.startPooling, 5000);
        };

        /**
         * Canceling pooling after page close
         */
        $scope.$on("$destroy", function (event) {
            $timeout.cancel(pooling);
        });

        $scope.startPooling();

        /**
         * Get transactions array
         */
        function getKudosTransactionsFeed() {
            KudosTransactionService.getKudosTransactionsFeed().then(function (transactions) {
                $scope.transactionCollection = transactions;
            });
        }

        /**
         * Change list of transactions and only those transactions that are missing
         * first in last out
         */
        function changeTransactionsList() {
            KudosTransactionService.getKudosTransactionsFeed().then(function (transactions) {
                transactions.forEach(function (transaction) {
                    if (arrayMismatchIndex($scope.transactionCollection, transaction) != true) {
                        $scope.transactionCollection.unshift(transaction);
                        $scope.transactionCollection.pop();
                    }
                });
            });
        }

        /**
         * Helpers
         */
        function arrayMismatchIndex(myArray, searchTerm) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (compareTransactions(myArray[i], searchTerm)) return true;
            }
            return i;
        }

        function compareTransactions(transaction, otherTransaction) {
            return transaction.timestamp === otherTransaction.timestamp && transaction.senderEmail === otherTransaction.senderEmail;
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
});


