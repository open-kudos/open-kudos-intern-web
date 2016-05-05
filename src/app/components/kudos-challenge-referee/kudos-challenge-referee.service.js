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
            getList: getRefereeList
        }
        return service;

        function getRefereeList(requestData) {
            return Challenges.getRefereed(requestData).then(function (val) {
                return val;
            })
        }
    }
})();