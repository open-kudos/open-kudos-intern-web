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
            $scope.showList = false;

            $scope.getRefereedList = getRefereedList;
            $scope.accomplishChallenge = accomplishChallenge;
            $scope.failChallenge = failChallenge;

            getRefereedList();

            function getRefereedList() {
                var challengeStatus = "ACCEPTED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });

                KudosChallengeRefereeService.getList(requestData).then(function (val) {
                    $scope.refereeList = val;

                    if ($scope.refereeList[0])
                        $scope.showList = true;
                    console.log($scope.showList)
                })
            }

            function accomplishChallenge(id) {
                console.log(id);
            }

            function failChallenge(id) {
                console.log(id);
            }
        });
})();