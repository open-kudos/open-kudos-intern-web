(function () {
    "use strict";
    angular.module('myApp.components.challengeReferee')
        .factory('KudosChallengeRefereeService', KudosChallengeRefereeService);

    KudosChallengeRefereeService.$inject = [
        "$httpParamSerializer",
        "Challenges"
    ];

    function KudosChallengeRefereeService($httpParamSerializer, Challenges) {
        var service = {
            getList: getRefereeList,
            accomplish : accomplishChallenge,
            fail: failChallenge
        }
        return service;

        function getRefereeList(requestData) {
            return Challenges.getRefereed(requestData).then(function (val) {
                return val;
            })
        }

        function accomplishChallenge(requestData) {
            return Challenges.accomplishChallenge(requestData).then(function (val) {
                return val;
            })
        }

        function failChallenge() {

        }
    }
})();