/**
 * Created by vytautassugintas on 09/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("Kudos", Kudos);

Kudos.$inject = [
    "$http",
    "SERVER"
];

function Kudos($http, SERVER) {
    var kudos = {
        send: sendKudos,
        incoming: getIncomingKudos,
        outgoing: getOutgoingKudos,
        remaining: getRemainingKudos,
        received: getReceivedKudos
    }
    return kudos;

    function sendKudos(requestData) {
        if(angular.isDefined(requestData.amount) && requestData.amount > 0) {
            return $http.post(SERVER.ip + "/kudos/send", requestData).then(function(response) {
                return response.data;
            });
        } else {
            var error = {
                message: "INVALID_AMOUNT"
            }
            return error;
        }
    }

    function getIncomingKudos() {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/kudos/incoming",
            withCredentials: true
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getOutgoingKudos() {
        return $http.get(SERVER.ip + "/kudos/outgoing").then(function(response) {
            return response.data;
        });
    }

    function getRemainingKudos() {
        return $http({
            method: 'GET',
            url: SERVER.ip + "/kudos/remaining",
            withCredentials: true
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getReceivedKudos() {
        return $http.get(SERVER.ip + "/kudos/received").then(function(response) {
            return response.data;
        });
    }
}