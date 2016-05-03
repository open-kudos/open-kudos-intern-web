"use strict";
angular.module("myApp.components.givenChallenges")
    .factory("GivenChallengesService", GivenChallengesService);

GivenChallengesService.$inject = [
    "Challenges"
];

function GivenChallengesService(challengesBackend){
    var service = {
        givenChallenges : GivenChallenges
    };
    return service;

    function GivenChallenges(requestData) {
        return challengesBackend.givenChallenges(requestData);
    }
}