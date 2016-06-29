"use strict";
angular.module("myApp.components.giveTeamChallenge")
    .factory("GiveTeamChallengeService", GiveTeamChallengeService);

GiveTeamChallengeService.$inject = [
    "Challenges"
];

function GiveTeamChallengeService(Challenges){
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