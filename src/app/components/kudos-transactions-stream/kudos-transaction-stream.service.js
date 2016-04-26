/**
 * Created by vytautassugintas on 26/04/16.
 */
"use strict";
angular.module("myApp.components")
    .factory("KudosTransactionService", KudosTransactionService);

KudosTransactionService.$inject = [
    "$timeout",
    "$httpParamSerializer",
    "ProfileService"
];

function KudosTransactionService($timeout, $httpParamSerializer, ProfileService) {
    var lastTransactionTimestamp;

    var service = {
        poll: PollTransactions,
        getKudosTransactionsFeed : GetKudosTransactionsFeed
    };
    return service;

    function PollTransactions() {
        return ProfileService.feedKudosChanged(lastTransactionTimestamp).then(function (val) {
            if (val === true) GetKudosTransactionsFeed();
            return val;
        });
    }

    function GetKudosTransactionsFeed() {
         return ProfileService.feedKudos().then(function (val) {
            lastTransactionTimestamp = $httpParamSerializer({
                lastTransactionTimestamp: val[0].timestamp
            });
            return val;
        });
    }

}