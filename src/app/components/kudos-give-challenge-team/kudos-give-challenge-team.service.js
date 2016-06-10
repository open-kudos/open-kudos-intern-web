"use strict";
angular.module("myApp.components.giveTeamChallenge")
    .factory("GiveTeamChallengeService", GiveTeamChallengeService);

GiveTeamChallengeService.$inject = [
    "Challenges",
    "User"
];

function GiveTeamChallengeService(Challenges, userBackend){
    var service = {
        create: createTeamChallenge
    };
    return service;

    function createTeamChallenge(requestData) {
        return Challenges.createTeam(requestData).then(function (val) {
            return val;
        })
    }
}