angular.module('myApp.components.givenChallenges', [])
    .component('kudosGivenChallenges', {
        templateUrl: 'app/components/kudos-given-challenges/kudos-given-challenges.html',
        controller: 'GivenChallengesController'
    })

    .controller('GivenChallengesController', function ($scope, $httpParamSerializer, GivenChallengesService) {

        var challengeStatus = "CREATED";
        var requestData = $httpParamSerializer({
            status: challengeStatus
        });

        $scope.givenChallengesCollection = [];
        $scope.showMoreInfo = showMoreInfo;
        $scope.showLessInfo = showLessInfo;
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

        function cancelChallenge(id) {
            var challengeId = $httpParamSerializer({
                id: id
            });
            Challenges.cancel(challengeId).then(function (val) {
                toastr.success("Challenge canceled");
                $scope.userAvailableKudos = $scope.userAvailableKudos + val.data.amount;
                var challenge = $filter('getByProperty')("id", id, $scope.givenChallengesCollection);
                $scope.givenChallengesCollection.splice($scope.givenChallengesCollection.indexOf(challenge), 1);
            });
        }
    });