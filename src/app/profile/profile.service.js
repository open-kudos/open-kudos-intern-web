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
            getTopReceivers: GetTopReceivers,
            getTopSenders: GetTopSenders,
            remainingKudos: RemainingKudos,
            receivedKudos: ReceivedKudos,
            getReceivedChallenges: ReceivedChallenges,
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

        function GetTopReceivers(requestData) {
            return userBackend.getTopReceivers(requestData);
        }

        function GetTopSenders(requestData) {
            return userBackend.getTopSenders(requestData);
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
            return challengesBackend.getReceivedChallenges();
        }

        function Logout() {
            return authBackend.logout();
        }
    }
})();
