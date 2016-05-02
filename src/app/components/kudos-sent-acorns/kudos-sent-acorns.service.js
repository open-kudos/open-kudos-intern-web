"use strict";
angular.module("myApp.components")
    .factory("SentAcornsService", SentAcornsService);

SentAcornsService.$inject = [
    "Kudos"
];

function SentAcornsService(kudosBackend){
    var service = {
        outgoingKudos : OutgoingKudos
    };
    return service;

    function OutgoingKudos() {
        return kudosBackend.outgoing();
    }
}