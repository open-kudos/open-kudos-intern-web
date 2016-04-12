/**
 * Created by vytautassugintas on 11/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("RegistrationService", RegistrationService);

RegistrationService.$inject = [
    "Auth",
    "$q"
];

function RegistrationService(authBackend, q) {
    var service = {
        register : Register,
        confirm : Confirm
    };
    return service;

    function Register(requestData){
        var deferred = q.defer();
        authBackend.register(requestData).then(function (response){
            deferred.resolve(response);
        }).catch(function (error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function Confirm(requestData){
        var deferred = q.defer();
        authBackend.confirm(requestData).then(function (response){
            deferred.resolve(response);
        }).catch(function (error){
            deferred.reject(error);
        });
        return deferred.promise;
    }

}