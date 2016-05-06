"use strict";
angular.module("myApp.components.giveChallenge")
    .factory("GiveChallengeService", GiveChallengeService);

GiveChallengeService.$inject = [
    "Challenges"
];

function GiveChallengeService(Challenges){
    var service = {
        create: createChallenge
    };
    return service;
    
    function createChallenge(requestData) {
        return Challenges.create(requestData).then(function (val) {
            return val;
        })
    }
}