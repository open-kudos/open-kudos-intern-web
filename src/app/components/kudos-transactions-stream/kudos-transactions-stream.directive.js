(function () {
    angular.module('myApp.components.transactions', [])
        .directive('kudosTransactionsStream', function () {
            return {
                controller: ('KudosTransactionController', KudosTransactionController),
                controllerAs: 'transaction',
                templateUrl: 'app/components/kudos-transactions-stream/kudos-transactions-stream.html'
            }
        });

    KudosTransactionController.$inject = ['$scope', '$timeout', '$httpParamSerializer', 'KudosTransactionService', 'Utils'];

    function KudosTransactionController($scope, $timeout, $httpParamSerializer, KudosTransactionService, Utils) {
        var vm = this;

        var status = "COMPLETED";
        var page = 0;
        var pageSize = 10;
        var requestData = $httpParamSerializer({
            status: status,
            page: page,
            pageSize: pageSize
        });
        vm.transactionCollection = [];

        vm.activate = activate();
        vm.showMoreTransactions = showMoreTransactions;
        vm.showLessTransactions = showLessTransactions;
        vm.acornPlural = Utils.acornPlural;
        vm.getKudosTransactionsFeed = getKudosTransactionsFeed;
        vm.changeTransactionsList = changeTransactionsList;
        vm.startPooling = startPooling;

        function activate() {
            getKudosTransactionsFeed();
            startPooling();
        }

        function startPooling() {
            KudosTransactionService.poll().then(function (transactionChanged) {
                if (transactionChanged === true) changeTransactionsList();
            });
            var pooling = $timeout(vm.startPooling, 5000);
        }

        $scope.$on("$destroy", function (event) {
            $timeout.cancel(pooling);
        });

        function getKudosTransactionsFeed() {
            KudosTransactionService.getCompletedKudosTransactions(requestData).then(function (transactions) {
                vm.transactionCollection = transactions;
            });
        }

        function loadMoreKudosTransactionsFeed() {
            KudosTransactionService.getCompletedKudosTransactions().then(function (transactions) {
                vm.transactionCollection = vm.transactionCollection.concat(transactions);
            });
        }

        function changeTransactionsList() {
            KudosTransactionService.getCompletedKudosTransactions(requestData).then(function (transactions) {
                transactions.forEach(function (transaction) {
                    if (arrayMismatchIndex(vm.transactionCollection, transaction) != true) {
                        vm.transactionCollection.unshift(transaction);
                        vm.transactionCollection.pop();
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
    }
})();

