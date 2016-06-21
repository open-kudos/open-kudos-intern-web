(function () {
    "use strict";
    angular.module("myApp.components.completedChallenges")
        .factory("CompletedChallengesService", CompletedChallengesService);

    CompletedChallengesService.$inject = [
        "Challenges"
    ];

    function CompletedChallengesService(challengesBackend) {
        var service = {
            completedChallenges: CompletedChallenges
        };
        return service;

        function CompletedChallenges() {
            return challengesBackend.completedChallenges();
        }
    }
})();