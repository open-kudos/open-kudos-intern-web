/**
 * Created by vytautassugintas on 25/04/16.
 */
angular.module('myApp.components', [])
    .controller('KudosTransactionController', function ($scope, $timeout, $httpParamSerializer, ProfileService, KudosTransactionService) {

        $scope.transactionCollection = [];

        $scope.acornPlural = acornPlural;
        $scope.getKudosTransactionsFeed = getKudosTransactionsFeed;

        getKudosTransactionsFeed();

        /**
         * Pooling REST method with 5 seconds timeout
         */
        $scope.startPooling = function () {
            KudosTransactionService.poll().then(function (transactionChanged) {
                if (transactionChanged === true) getKudosTransactionsFeed();
            });
            $scope.startCount = $scope.startCount + 1;
            pooling = $timeout($scope.startPooling, 5000);
        };

        $scope.$on("$destroy", function (event)
        {
            $timeout.cancel(pooling);
        });

        $scope.startPooling();

        function getKudosTransactionsFeed() {
            KudosTransactionService.getKudosTransactionsFeed().then(function (transactions) {
                $scope.transactionCollection = transactions;
            });
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    })
    .directive('kudosTransactionsStream', function () {
        return {
            controller: 'KudosTransactionController',
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/kudos-transactions-stream/kudos-transactions-stream.html'
        }
    });