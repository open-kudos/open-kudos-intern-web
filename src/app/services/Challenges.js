"use strict";
angular.module("myApp")
    .factory("Challenges", Challenges);

Challenges.$inject = [
    "$http",
    "SERVER"
];

function Challenges($http, SERVER) {
    var challenges = {
        givenChallenges: getGivenChallenges
    }
    return challenges;

    function getGivenChallenges() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/created",
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

}