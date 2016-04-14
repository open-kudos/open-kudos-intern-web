/**
 * Created by vytautassugintas on 09/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("ProfileService", ProfileService);

ProfileService.$inject = [
    "User",
    "Kudos",
    "Auth"
];

function ProfileService(userBackend, kudosBackend, authBackend) {
    var service = {
        userHome: UserHome,
        updateUser: UpdateUser,
        listUsers: ListUsers,
        remainingKudos: RemainingKudos,
        incomingKudos: IncomingKudos,
        outgoingKudos: OutgoingKudos,
        receivedKudos: ReceivedKudos,
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
        return kudosBackend.send(sendTo);
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

    function Logout() {
        return authBackend.logout();
    }


}