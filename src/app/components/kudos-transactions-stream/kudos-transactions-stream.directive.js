/**
 * Created by vytautassugintas on 25/04/16.
 */
angular.module('myApp.components', [])
    .controller('KudosTransactionController', function ($scope, $timeout, $httpParamSerializer, ProfileService) {

        var lastTransactionTimestamp;
        var poll;
        $scope.transactionCollection = [];

        $scope.acornPlural = acornPlural;

        getKudosTransactionsFeed();

        poll = function () {
            $timeout(function () {
                ProfileService.feedKudosChanged(lastTransactionTimestamp).then(function (val) {
                    if (val === true) getKudosTransactionsFeed();
                    poll();
                });
            }, 5000);
        };

        poll();

        function getKudosTransactionsFeed() {
            ProfileService.feedKudos().then(function (val) {
                $scope.transactionCollection = val;
                lastTransactionTimestamp = $httpParamSerializer({
                    lastTransactionTimestamp: val[0].timestamp
                });
            });
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

    })
    .directive('kudosTransactionsStream', function () {
        return {
            templateUrl: 'app/components/kudos-transactions-stream/kudos-transactions-stream.html'
        }
    });