(function() {
"use strict";
angular.module("myApp")
    .factory("Challenges", Challenges);

Challenges.$inject = [
    "$http",
    "SERVER"
];

function Challenges($http, SERVER) {
    var challenges = {
        createChallenge: createChallenge,
        cancelChallenge: cancelChallenge,
        getCompletedChallenges: getCompletedChallenges,
        receivedChallenges: getReceivedChallenges,
        declineChallenge: declineChallenge,
        acceptChallenge: acceptChallenge,
        accomplishChallenge: accomplishChallenge,
        failChallenge: failChallenge,
        allReceivedChallenges: allReceivedChallenges,
        createTeam: createTeamChallenge,
        teamReceivedChallenges: receiveTeamChallenges,
        getOngoingChallenges: getOngoingChallenges,
        getNewChallenges: getNewChallenges
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

    function getCompletedChallenges() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/completedChallenges",
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function getReceivedChallenges(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/participatedByStatusPageable?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function declineChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/decline?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function acceptChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/accept?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function accomplishChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/accomplish?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function failChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenges/fail?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function allReceivedChallenges(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/participatedByStatus?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function createTeamChallenge(requestData) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/teamchallenges/create?" + requestData,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function receiveTeamChallenges(requestData) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/teamchallenges/participatedByStatus?" + requestData,
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function getOngoingChallenges() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/ongoing",
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }

    function getNewChallenges() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenges/new",
            withCredentials: true
        }).then(function(response) {
            return response.data;
        });
    }
}
})();
