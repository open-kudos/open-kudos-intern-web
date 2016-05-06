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

            $scope.challengeList = [];

            $scope.getChallengeParticipatedList = getChallengeParticipatedList;
            $scope.acceptChallenge = acceptChallenge;
            $scope.declineChallenge = declineChallenge;
            $scope.removeFirstElement = removeFirstElement;
            $scope.refreshList = refreshList;

            getChallengeParticipatedList();

            function getChallengeParticipatedList() {
                var challengeStatus = "CREATED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });
                $scope.id = false;

                KudosChallengeParticipatedService.getList(requestData).then(function (val) {
                    $scope.challengeList = val;
                    refreshList();
                })
            }

            function acceptChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });
                KudosChallengeParticipatedService.accept(requestData).then(function (val) {
                    toastr.success('You accepted ' + val.data.creator + ' challenge');
                    removeFirstElement();
                    refreshList();
                })
            }

            function declineChallenge(id) {
                requestData = $httpParamSerializer({
                    id: id
                });
                KudosChallengeParticipatedService.decline(requestData).then(function (val) {
                    toastr.info('You declined ' + val.data.creator + ' challenge');
                    removeFirstElement();
                    refreshList();
                })
            }

            function removeFirstElement(){
                $scope.challengeList.splice(0, 1);
            }

            function refreshList(){
                $scope.id = false;
                if ($scope.challengeList[0]) {
                    $scope.id = $scope.challengeList[0].id;
                    $scope.challengeAmount = $scope.challengeList[0].amount;
                    $scope.challengeName = $scope.challengeList[0].name;
                    $scope.challengeCreator = $scope.challengeList[0].creator;
                    $scope.challengeDescription = $scope.challengeList[0].description;
                    $scope.challengeFinishDate = $scope.challengeList[0].finishDate;
                    $scope.challengeReferee = $scope.challengeList[0].referee;
                }
            }
        });
})();