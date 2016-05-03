
"use strict";
angular.module("myApp.components.challengeParticipated")
    .factory("KudosChallengeParticipatedService", KudosChallengeParticipatedService);

KudosChallengeParticipatedService.$inject = [
    "$httpParamSerializer",
    "Challenges"
];

function KudosChallengeParticipatedService($httpParamSerializer, Challenges) {
    var service = {
        getList: getChallengeParticipatedList,
        decline: declineChallenge
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
}