(function () {
    "use strict";
    angular.module("myApp.components.challenges-panel")
        .factory("ChallengesPanelService", ChallengesPanelService);

    ChallengesPanelService.$inject = [];

    function ChallengesPanelService() {
        var newChallengesAmount;
        var ongoingChallengesAmount;
        var completedChallengesAmount;

        var service = {
            getNewChallengesAmount: getNewChallengesAmount,
            setNewChallengesAmount: setNewChallengesAmount,
            getOngoingChallengesAmount: getOngoingChallengesAmount,
            setOngoingChallengesAmount: setOngoingChallengesAmount,
            getCompletedChallengesAmount: getCompletedChallengesAmount,
            setCompletedChallengesAmount: setCompletedChallengesAmount
        };
        return service;

        function observeNewChallenges() {
            return defer.promise();
        }

        function getNewChallengesAmount() {
            return newChallengesAmount;
        }

        function setNewChallengesAmount(amount) {
            newChallengesAmount = amount;
        }

        function getOngoingChallengesAmount() {
            return ongoingChallengesAmount;
        }

        function setOngoingChallengesAmount(amount) {
            ongoingChallengesAmount = amount;
        }

        function getCompletedChallengesAmount() {
            return completedChallengesAmount;
        }

        function setCompletedChallengesAmount(amount) {
            completedChallengesAmount = amount;
        }
    }
})();