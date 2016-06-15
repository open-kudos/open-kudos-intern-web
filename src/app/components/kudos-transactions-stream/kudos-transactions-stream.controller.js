/**
 * Created by vytautassugintas on 25/04/16.
 */
(function () {

    var KudosTransactionController = function ($scope, $timeout, $httpParamSerializer, KudosTransactionService) {

        var status = "COMPLETED";
        var page = 0;
        var pageSize = 10;

        var requestData = $httpParamSerializer({
            status: status,
            page: page,
            pageSize: pageSize
        });

        $scope.transactionCollection = [];

        $scope.showMoreTransactions = showMoreTransactions;
        $scope.showLessTransactions = showLessTransactions;
        $scope.acornPlural = acornPlural;
        $scope.getKudosTransactionsFeed = getKudosTransactionsFeed;
        $scope.changeTransactionsList = changeTransactionsList;

        getKudosTransactionsFeed();

        $scope.startPooling = function () {
            KudosTransactionService.poll().then(function (transactionChanged) {
                if (transactionChanged === true) changeTransactionsList();
            });
            pooling = $timeout($scope.startPooling, 5000);
        };

        $scope.$on("$destroy", function (event) {
            $timeout.cancel(pooling);
        });

        $scope.startPooling();

        function getKudosTransactionsFeed() {
            KudosTransactionService.getCompletedKudosTransactions(requestData).then(function (transactions) {
                $scope.transactionCollection = transactions;
            });
        }

        function loadMoreKudosTransactionsFeed() {
            KudosTransactionService.getCompletedKudosTransactions().then(function (transactions) {
                $scope.transactionCollection = $scope.transactionCollection.concat(transactions);
            });
        }

        function changeTransactionsList() {
            KudosTransactionService.getCompletedKudosTransactions(requestData).then(function (transactions) {
                transactions.forEach(function (transaction) {
                    if (arrayMismatchIndex($scope.transactionCollection, transaction) != true) {
                        $scope.transactionCollection.unshift(transaction);
                        $scope.transactionCollection.pop();
                    }
                });
            });
        }

        function showMoreTransactions() {
            page++;
            requestData = $httpParamSerializer({
                page: page,
                pageSize: pageSize
            });
            console.log(page + " " + pageSize);
            loadMoreKudosTransactionsFeed();
        }

        function showLessTransactions() {
            page = 0;
            requestData = $httpParamSerializer({
                page: page,
                pageSize: pageSize
            });
            console.log(page + " " + pageSize);
            getKudosTransactionsFeed();
        }

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
    };

    KudosTransactionController.$inject = ['$scope', '$timeout', '$httpParamSerializer', 'KudosTransactionService'];

    angular.module('myApp.components.transactions', [])
        .directive('kudosTransactionsStream', function () {
            return {
                controller: 'KudosTransactionController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-transactions-stream/kudos-transactions-stream.html'
            }
        })
        .controller('KudosTransactionController', KudosTransactionController)
})();

