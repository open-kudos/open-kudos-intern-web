/**
 * Created by vytautassugintas on 09/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("ProfileService", ProfileService);

ProfileService.$inject = [
    "User",
    "Kudos",
    "Auth",
    "$q"
];

function ProfileService(userBackend, kudosBackend, authBackend, q) {
    var service = {
        userHome : UserHome,
        remainingKudos: RemainingKudos,
        incomingKudos: IncomingKudos,
        checkUser : CheckUser,
        logout: Logout
    };
    return service;

    function UserHome(){
        var deferred = q.defer();
        userBackend.home().then(function (response) {
            deferred.resolve(response);
        }).catch(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function CheckUser(){
        var deferred = q.defer();
        userBackend.check().then(function (response) {
            deferred.resolve(response);
        }).catch(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function RemainingKudos() {
        var deferred = q.defer();
        kudosBackend.remaining().then(function (response) {
            deferred.resolve(response);
        }).catch(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function IncomingKudos() {
        var deferred = q.defer();
        kudosBackend.incoming().then(function (response) {
            deferred.resolve(response);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function Logout(){
        var deferred = q.defer();
        authBackend.logout().then(function (response) {
            deferred.resolve(response);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }



}