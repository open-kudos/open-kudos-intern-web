"use strict";
angular.module("myApp.components.giveTeamChallenge")
    .factory("GiveTeamChallengeService", GiveTeamChallengeService);

GiveTeamChallengeService.$inject = [
    "Challenges",
    "User"
];

function GiveTeamChallengeService(Challenges, userBackend){
    var service = {
        createTeamChallenge: createTeamChallenge
    };
    return service;

    function createTeamChallenge(requestData) {
        return Challenges.createTeamChallenge(requestData).then(function (val) {
            return val;
        })
    }
}