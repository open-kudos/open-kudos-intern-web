"use strict";
angular.module("myApp.components.giveKudos")
    .factory("GiveKudosService", GiveKudosService);

GiveKudosService.$inject = [
    "$q",
    "Kudos",
    "User"
];

function GiveKudosService($q, kudosBackend, userBackend){
    var service = {
        sendKudos : SendKudos,
        listUsers : ListUsers
    };
    return service;

    function SendKudos(sendTo) {
        var deferred = $q.defer();
        kudosBackend.send(sendTo).then(function (response) {
            deferred.resolve(response);
        }).catch(function(response){
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function ListUsers(){
        return userBackend.list();
    }
}