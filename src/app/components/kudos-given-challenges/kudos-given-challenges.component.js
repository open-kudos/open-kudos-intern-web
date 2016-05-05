(function () {
    angular.module('myApp.components.givenChallenges', [])
        .component('kudosGivenChallenges', {
            templateUrl: 'app/components/kudos-given-challenges/kudos-given-challenges.html',
            controller: 'GivenChallengesController'
        })

        .controller('GivenChallengesController', function ($scope, $httpParamSerializer, GivenChallengesService, Challenges) {

            var challengeStatus = "CREATED";
            var requestData = $httpParamSerializer({
                status: challengeStatus
            });

            $scope.givenChallengesCollection = [];
            $scope.showMoreInfo = showMoreInfo;
            $scope.showLessInfo = showLessInfo;
            $scope.doesDateExist = doesDateExist;
            $scope.cancelChallenge = cancelChallenge;


            GivenChallengesService.givenChallenges(requestData).then(function (val) {
                $scope.givenChallengesCollection = val;
            });

            function showMoreInfo(index) {
                $scope.givenChallengesCollection[index].show = true;
            }

            function showLessInfo(index) {
                $scope.givenChallengesCollection[index].show = false;
            }

            function doesDateExist(index) {
                return $scope.givenChallengesCollection[index].finishDate == null;
            }

            function cancelChallenge(index) {
                var challengeId = $httpParamSerializer({
                    id: $scope.givenChallengesCollection[index].id
                });
                Challenges.cancel(challengeId).then(function (val) {
                    $scope.userAvailableKudos = $scope.userAvailableKudos + val.data.amount;
                    $scope.givenChallengesCollection.splice(index, 1);
                    toastr.success("Challenge canceled");
                });
            }
        });
})();