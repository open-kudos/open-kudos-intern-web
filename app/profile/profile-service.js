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
    "$q",
    "$rootScope"
];

function ProfileService(userBackend, kudosBackend, authBackend, q, $rootScope) {
    var service = {
        userHome : UserHome,
        updateUser: UpdateUser,
        remainingKudos: RemainingKudos,
        incomingKudos: IncomingKudos,
        receivedKudos: ReceivedKudos,
        send: SendKudos,
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
            $rootScope.loggedIn = response.logged;
            deferred.resolve(response);
        }).catch(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function UpdateUser(updateInfo){
        var deferred = q.defer();
        userBackend.update(updateInfo).then(function (response) {
            deferred.resolve(response);
        }).catch(function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function SendKudos(sendTo){
        var deferred = q.defer();
        kudosBackend.send(sendTo).then(function (response) {
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

    function ReceivedKudos(){
        var deferred = q.defer();
        kudosBackend.received().then(function (response) {
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