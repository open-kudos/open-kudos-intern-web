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

function ProfileService(userBackend, kudosBackend, authBackend, $q) {
    var service = {
        userHome: UserHome,
        updateUser: UpdateUser,
        listUsers: ListUsers,
        remainingKudos: RemainingKudos,
        incomingKudos: IncomingKudos,
        outgoingKudos: OutgoingKudos,
        receivedKudos: ReceivedKudos,
        feedKudos: StreamKudos,
        feedKudosChanged: StreamKudosChanged,
        send: SendKudos,
        checkUser: CheckUser,
        logout: Logout
    };
    return service;

    function UserHome() {
        return userBackend.home();
    }

    function CheckUser() {
        return userBackend.check();
    }

    function ListUsers(){
        return userBackend.list();
    }

    function UpdateUser(updateInfo) {
        return userBackend.update(updateInfo);
    }

    function SendKudos(sendTo) {
        var deferred = $q.defer();
        kudosBackend.send(sendTo).then(function (response) {
            deferred.resolve(response);
        }).catch(function(response){
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function RemainingKudos() {
        return kudosBackend.remaining();
    }

    function IncomingKudos() {
        return kudosBackend.incoming();
    }

    function OutgoingKudos() {
        return kudosBackend.outgoing();
    }

    function ReceivedKudos() {
        return kudosBackend.received();
    }

    function StreamKudos() {
        return kudosBackend.feed();
    }

    function StreamKudosChanged(requestData) {
        return kudosBackend.feedChanged(requestData);
    }

    function Logout() {
        return authBackend.logout();
    }

}
