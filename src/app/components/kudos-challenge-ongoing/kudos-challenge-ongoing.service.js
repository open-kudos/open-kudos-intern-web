(function () {
    "use strict";
    angular.module("myApp.components.challengeOngoing")
        .factory("KudosChallengeOngoingService", KudosChallengeOngoingService);

    KudosChallengeOngoingService.$inject = [
        "$httpParamSerializer",
        "Challenges"
    ];

    function KudosChallengeOngoingService($httpParamSerializer, Challenges) {
        var service = {

        };
        return service;
    }
})();