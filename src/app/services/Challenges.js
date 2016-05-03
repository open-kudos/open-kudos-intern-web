"use strict";
angular.module("myApp")
    .factory("Challenges", Challenges);

Challenges.$inject = [
    "$http",
    "SERVER"
];

function Challenges($http, SERVER) {
    var challenges = {
        create: createChallenge,
        cancel: cancelChallenge,
        givenChallenges: getGivenChallenges,
        receivedChallenges: getReceivedChallenges
    }
    return challenges;

    function createChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/create?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function cancelChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/cancel?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function getGivenChallenges() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/created",
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function getReceivedChallenges(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/participatedByStatus?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

}