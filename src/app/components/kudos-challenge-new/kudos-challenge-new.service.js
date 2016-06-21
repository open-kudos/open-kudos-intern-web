(function () {
    "use strict";
    angular.module("myApp.components.challengeNew")
        .factory("KudosChallengeNewService", KudosChallengeNewService);

    KudosChallengeNewService.$inject = [
        "$httpParamSerializer",
        "Challenges"
    ];

    function KudosChallengeNewService($httpParamSerializer, Challenges) {
        var service = {
            getList: getChallengeParticipatedList,
            getFullList: getAllChallengeParticipatedList,
            decline: declineChallenge,
            accept: acceptChallenge,
            getNewChallenges: getNewChallenges,
            getTeamList: getTeamChallengeParticipatedList
        }
        return service;

        function getChallengeParticipatedList(requestData) {
            return Challenges.receivedChallenges(requestData).then(function (val) {
                return val;
            });
        }

        function declineChallenge(requestData) {
            return Challenges.declineChallenge(requestData).then(function (val) {
                return val
            })
        }

        function acceptChallenge(requestData) {
            return Challenges.acceptChallenge(requestData).then(function (val) {
                return val;
            })
        }
        
        function getAllChallengeParticipatedList(requestData) {
            return Challenges.allReceivedChallenges(requestData).then(function (val) {
                return val;
            })
        }

        function getNewChallenges() {
            return Challenges.getNewChallenges().then(function (val) {
                return val;
            })
        }

        function getTeamChallengeParticipatedList(requestData){
            return Challenges.teamReceivedChallenges(requestData).then(function (val) {
                return val;
            })
        }
    }
})();