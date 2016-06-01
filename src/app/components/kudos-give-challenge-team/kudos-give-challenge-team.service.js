"use strict";
angular.module("myApp.components.giveTeamChallenge")
    .factory("GiveTeamChallengeService", GiveTeamChallengeService);

GiveTeamChallengeService.$inject = [
    "Challenges",
    "User"
];

function GiveTeamChallengeService(Challenges, userBackend){
    var service = {
        
    };
    return service;
}