(function () {
    angular.module('myApp.components.challengeOngoing', [])

        .directive('kudosChallengeOngoing', function () {
            return {
                controller: 'KudosChallengeOngoingController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-ongoing/kudos-challenge-ongoing.html'
            }
        })

        .controller('KudosChallengeOngoingController', function ($httpParamSerializer, $scope, KudosChallengeOngoingService, Resources) {
            var requestData;

            $scope.showList = false;
            $scope.givenList = [];
            $scope.receivedList = [];
            $scope.ongoingChallengeList = [];
            $scope.userEmail = Resources.getCurrentUserEmail();

            $scope.getChallengeOngoingList = getChallengeOngoingList;
            $scope.won = won;
            $scope.lost = lost;
            $scope.convertDate = convertDate;

            getChallengeOngoingList();

            function getChallengeOngoingList() {
                var challengeStatus = "ACCEPTED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });

                KudosChallengeOngoingService.getReceivedList(requestData).then(function (val) {
                    $scope.receivedList = val;
                    KudosChallengeOngoingService.getGivenList(requestData).then(function (value) {
                        $scope.givenList = value;
                        $scope.ongoingChallengeList = $scope.receivedList.concat($scope.givenList);

                        $scope.showList = !!$scope.ongoingChallengeList[0];
                    });
                });
            }

            function lost() {

            }

            function won() {

            }

            function convertDate(val){
                val = val.split(":");
                val = val[0] + ":" + val[1];
                return val;
            }
        });
})();