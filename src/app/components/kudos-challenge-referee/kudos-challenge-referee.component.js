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
            $scope.accomplishChallenge = accomplishChallenge;
            $scope.failChallenge = failChallenge;
            $scope.acornChecker = acornChecker;

            getRefereedList();

            function getRefereedList() {
                var challengeStatus = "ACCEPTED";
                $scope.showList = false;

                requestData = $httpParamSerializer({
                    status: challengeStatus
                });

                KudosChallengeRefereeService.getList(requestData).then(function (val) {
                    $scope.refereeList = val;

                    if ($scope.refereeList[0])
                        $scope.showList = true;
                })
            }

            function accomplishChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });

                KudosChallengeRefereeService.accomplish(requestData).then(function (val) {
                    toastr.success('You marked ' + val.data.name + ' challenge as Accomplished. '
                                    + val.data.participant + ' got ' + val.data.amount + ' ' + acornChecker(val.data.amount));
                    getRefereedList();
                })
            }

            function failChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });

                KudosChallengeRefereeService.fail(requestData).then(function (val) {
                    toastr.error('You marked ' + val.data.name + ' challenge as failed. ');
                    getRefereedList();
                })
            }

            function acornChecker(val) {
                if (val > 1)
                    return 'Acorns';
                else
                    return 'Acorn';
            }
        });
})();