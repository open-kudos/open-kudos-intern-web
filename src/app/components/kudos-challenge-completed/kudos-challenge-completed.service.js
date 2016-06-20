(function () {
    "use strict";
    angular.module("myApp.components.givenChallenges")
        .factory("CompletedChallengesService", CompletedChallengesService);

    CompletedChallengesService.$inject = [
        "Challenges"
    ];

    function CompletedChallengesService(challengesBackend) {
        var service = {
            completedChallenges: CompletedChallenges
        };
        return service;

        function CompletedChallenges(requestData) {
            return challengesBackend.completedChallenges(requestData);
        }
    }
})();