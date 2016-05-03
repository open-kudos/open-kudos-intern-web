
"use strict";
angular.module("myApp.components.challengeParticipated")
    .factory("KudosChallengeParticipatedService", KudosChallengeParticipatedService);

KudosChallengeParticipatedService.$inject = [
    "$httpParamSerializer",
    "Challenges"
];

function KudosChallengeParticipatedService($httpParamSerializer, Challenges) {
    var service = {
        getList: getChallengeParticipatedList
    }
    return service;

    function getChallengeParticipatedList(requestData) {
        return Challenges.receivedChallenges(requestData).then(function (val) {
            return val;
        });
    }
}