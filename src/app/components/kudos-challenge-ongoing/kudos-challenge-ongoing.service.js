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
            getReceivedList: getReceivedChallenges,
            getGivenList: getGivenChallenges,
            accomplish: accomplishChallenge,
            getOngoingChallenges: getOngoingChallenges
        }
        return service;

        function getReceivedChallenges(requestData) {
            return Challenges.allReceivedChallenges(requestData).then(function (val) {
                return val;
            });
        }
        
        function getGivenChallenges(requestData){
            return Challenges.completedChallenges(requestData).then(function (val) {
                return val;
            });
        }
        
        function accomplishChallenge(requestData) {
            return Challenges.accomplishChallenge(requestData).then(function (val) {
                return val;
            });
        }

        function getOngoingChallenges() {
            return Challenges.getOngoingChallenges().then(function(val) {
                return val;
            });
        }
    }
})();