(function () {
    angular.module('myApp.components.givenChallenges', [])
        .component('kudosGivenChallenges', {
            templateUrl: 'app/components/kudos-given-challenges/kudos-given-challenges.html',
            controller: 'GivenChallengesController'
        })

        .controller('GivenChallengesController', function ($scope, $httpParamSerializer, GivenChallengesService, Challenges, Resources) {
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
                Resources.setGivenChallenges(val);
                $scope.givenChallengesCollection = Resources.getGivenChallenges();
            });

            function showMoreInfo(index) {
                Resources.getGivenChallenges()[index].show = true;
            }

            function showLessInfo(index) {
                Resources.getGivenChallenges()[index].show = false;
            }

            function doesDateExist(index) {
                return Resources.getGivenChallenges()[index].finishDate == null;
            }

            function cancelChallenge(index) {
                var challengeId = $httpParamSerializer({
                    id: Resources.getGivenChallenges()[index].id
                });
                Challenges.cancel(challengeId).then(function (val) {
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() + val.data.amount);
                    Resources.getGivenChallenges().splice(index, 1);
                    $scope.givenChallengesCollection = Resources.getGivenChallenges();
                    toastr.success("Challenge canceled");
                });
            }
        });
})();