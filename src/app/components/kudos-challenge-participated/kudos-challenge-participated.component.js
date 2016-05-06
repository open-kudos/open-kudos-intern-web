(function () {
    angular.module('myApp.components.challengeParticipated', [])

        .directive('kudosChallengeParticipated', function () {
            return {
                controller: 'KudosChallengeParticipatedController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-participated/kudos-challenge-participated.html'
            }
        })

        .controller('KudosChallengeParticipatedController', function ($httpParamSerializer, $scope, KudosChallengeParticipatedService) {
            var requestData;
            $scope.getChallengeParticipatedList = getChallengeParticipatedList;
            $scope.acceptChallenge = acceptChallenge;
            $scope.declineChallenge = declineChallenge;

            getChallengeParticipatedList();

            function getChallengeParticipatedList() {
                var challengeStatus = "CREATED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });
                $scope.id = false;

                KudosChallengeParticipatedService.getList(requestData).then(function (val) {
                    if (val[0]) {
                        $scope.id = val[0].id;
                        $scope.challengeAmount = val[0].amount;
                        $scope.challengeName = val[0].name;
                        $scope.challengeCreator = val[0].creator;
                        $scope.challengeDescription = val[0].description;
                        $scope.challengeFinishDate = val[0].finishDate;
                        $scope.challengeReferee = val[0].referee;
                    }
                })
            }

            function acceptChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });
                KudosChallengeParticipatedService.accept(requestData).then(function (val) {
                    toastr.success('You accepted ' + val.data.creator + ' challenge');
                    getChallengeParticipatedList();
                })
            }

            function declineChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });
                KudosChallengeParticipatedService.decline(requestData).then(function (val) {
                    toastr.info('You declined ' + val.data.creator + ' challenge');
                    getChallengeParticipatedList();
                })
            }
        });
})();