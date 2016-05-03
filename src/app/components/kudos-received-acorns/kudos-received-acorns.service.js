"use strict";
angular.module("myApp.components.receivedAcorns")
    .factory("ReceivedAcornsService", ReceivedAcornsService);

ReceivedAcornsService.$inject = [
    "Kudos"
];

function ReceivedAcornsService(kudosBackend){
    var service = {
        incomingKudos : IncomingKudos
    };
    return service;

    function IncomingKudos() {
        return kudosBackend.incoming();
    }
}