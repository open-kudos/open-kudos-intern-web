(function () {
    angular.module('myApp.components.challengeReferee', [])

        .directive('kudosChallengeReferee', function () {
            return {
                controller: 'KudosChallengeRefereeController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-referee/kudos-challenge-referee.html'
            }
        })

        .controller('KudosChallengeRefereeController', function ($httpParamSerializer, $scope, KudosChallengeRefereeService) {
            var requestData;

            $scope.getRefereedList = getRefereedList;

            getRefereedList();

            function getRefereedList() {
                var challengeStatus = "ACCEPTED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });

                KudosChallengeRefereeService.getList(requestData).then(function (val) {
                    $scope.refereeList = val;
                })
            }
        });
})();