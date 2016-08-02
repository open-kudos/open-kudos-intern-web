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
        giveChallenge: giveChallenge,
        cancelChallenge: cancelChallenge,
        declineChallenge: declineChallenge,
        acceptChallenge: acceptChallenge,
        getOngoingChallenges: getOngoingChallenges,
        markChallengeAsCompleted: markChallengeAsCompleted,
        markChallengeAsFailed: markChallengeAsFailed,
        getSentAndReceived: getSentAndReceived,
        getChallengesHistory: getChallengesHistory,
        getAccomplishedChallenges: getAccomplishedChallenges,
        getFailedChallenges: getFailedChallenges,
        getUserChallengesHistory: getUserChallengesHistory,
        getUserAccomplishedChallenges: getUserAccomplishedChallenges,
        getUserFailedChallenges: getUserFailedChallenges,
        addComment: addComment,
        getComments: getComments
    }
    return challenges;

    function giveChallenge(requestData) {
        return $http({
            method: 'POST',
            data: requestData,
            url: SERVER.ip + "/challenge/give",
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function acceptChallenge(challengeId) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenge/" + challengeId + "/accept",
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function declineChallenge(challengeId) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenge/" + challengeId + "/decline",
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function cancelChallenge(challengeId) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenge/" + challengeId + "/cancel",
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function markChallengeAsCompleted(challengeId) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenge/" + challengeId + "/markAsCompleted",
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function markChallengeAsFailed(challengeId) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/challenge/" + challengeId + "/markAsFailed",
            withCredentials: true
        }).then(function(response) {
            return response;
        })
    }

    function getSentAndReceived(requestParams) {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/challenge/sentAndReceived",
            params: requestParams,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }
    
    function getOngoingChallenges(requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/ongoing",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getChallengesHistory(requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getAccomplishedChallenges(requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history/accomplished",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getFailedChallenges(requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history/failed",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getUserChallengesHistory(userId, requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history/" + userId,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getUserAccomplishedChallenges(userId, requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history/accomplished/" + userId,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function getUserFailedChallenges(userId, requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/history/failed/" + userId,
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }

    function addComment(challengeId, requestBody) {
        return $http({
            method: 'POST',
            data: requestBody,
            url: SERVER.ip + "/challenge/" + challengeId + "/addComment",
            withCredentials: true
        }).then(function (response) {
            return response;
        });
    }

    function getComments(challengeId, requestParams) {
        return $http({
            method: 'GET',
            params: requestParams,
            url: SERVER.ip + "/challenge/" + challengeId + "/comments",
            withCredentials: true
        }).then(function (response) {
            return response.data;
        });
    }
}
})();
