/**
 * Created by vytautassugintas on 09/04/16.
 */
(function () {
    "use strict";
    angular.module("myApp")
        .factory("ProfileService", ProfileService);

    ProfileService.$inject = [
        "User",
        "Kudos",
        "Challenges",
        "Auth",
        "$q"
    ];

    function ProfileService(userBackend, kudosBackend, challengesBackend, authBackend, $q) {
        var service = {
            userHome: UserHome,
            updateUser: UpdateUser,
            listUsers: ListUsers,
            remainingKudos: RemainingKudos,
            receivedKudos: ReceivedKudos,
            receivedChallenges: ReceivedChallenges,
            feedKudos: StreamKudos,
            feedKudosChanged: StreamKudosChanged,
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

        function ListUsers() {
            return userBackend.list();
        }

        function UpdateUser(updateInfo) {
            return userBackend.update(updateInfo);
        }

        function RemainingKudos() {
            return kudosBackend.remaining();
        }

        function ReceivedKudos() {
            return kudosBackend.received();
        }

        function StreamKudos(requestData) {
            return kudosBackend.feed(requestData);
        }

        function StreamKudosChanged(requestData) {
            return kudosBackend.feedChanged(requestData);
        }

        function ReceivedChallenges() {
            return challengesBackend.receivedChallenges();
        }

        function Logout() {
            return authBackend.logout();
        }
    }
})();
