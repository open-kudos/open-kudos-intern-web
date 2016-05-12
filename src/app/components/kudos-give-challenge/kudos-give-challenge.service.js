"use strict";
angular.module("myApp.components.giveChallenge")
    .factory("GiveChallengeService", GiveChallengeService);

GiveChallengeService.$inject = [
    "Challenges",
    "User"
];

function GiveChallengeService(Challenges, userBackend){
    var service = {
        create: createChallenge,
        listUsers: ListUsers
    };
    return service;
    
    function createChallenge(requestData) {
        return Challenges.create(requestData).then(function (val) {
            return val;
        })
    }

    function ListUsers(){
        return userBackend.list();
    }
}