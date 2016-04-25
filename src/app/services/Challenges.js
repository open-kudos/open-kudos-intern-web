
"use strict";
angular
    .module("myApp")
    .factory("Challenges", Challenges);

Challenges.$inject = [
    "$http",
    "SERVER"
];

function Challenges($http, SERVER) {
    var challenges = {
        create: createChallenge
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
}