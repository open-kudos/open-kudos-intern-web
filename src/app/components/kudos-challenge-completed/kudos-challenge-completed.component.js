(function () {

    var CompletedChallengesController = function ($scope, $httpParamSerializer, CompletedChallengesService, Challenges, Resources) {

        $scope.completedChallengesCollection = [];
        $scope.showList = false;

        $scope.showMoreInfo = showMoreInfo;
        $scope.showLessInfo = showLessInfo;
        $scope.doesDateExist = doesDateExist;
        $scope.cancelChallenge = cancelChallenge;
        $scope.checkList = checkList;
        $scope.convertDate = convertDate;
        $scope.acornPlural = acornPlural;

        CompletedChallengesService.completedChallenges().then(function (val) {
            Resources.setCompletedChallenges(val);
            $scope.completedChallengesCollection = Resources.getCompletedChallenges();
        });

        function showMoreInfo(index) {
            Resources.getCompletedChallenges()[index].show = true;
        }

        function showLessInfo(index) {
            Resources.getCompletedChallenges()[index].show = false;
        }

        function doesDateExist(index) {
            return Resources.getCompletedChallenges()[index].finishDate == null;
        }

        function cancelChallenge(index) {
            var challengeId = $httpParamSerializer({
                id: Resources.getCompletedChallenges()[index].id
            });
            Challenges.cancel(challengeId).then(function (val) {
                Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() + val.data.amount);
                Resources.getCompletedChallenges().splice(index, 1);
                $scope.completedChallengesCollection = Resources.getCompletedChallenges();
                toastr.success("Challenge canceled");
            });
        }

        function checkList() {
            $scope.showList = $scope.completedChallengesCollection.length > 0;
        }

        function convertDate(val) {
            if (val) {
                val = val.split(":");
                val = val[0] + ":" + val[1];
                return val;
            }
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

        $scope.$watch(function () {
            checkList();
        });

    };

    CompletedChallengesController.$inject = ['$scope', '$httpParamSerializer', 'CompletedChallengesService', 'Challenges', 'Resources'];

    angular.module('myApp.components.givenChallenges', [])
        .component('kudosChallengeCompleted', {
            templateUrl: 'app/components/kudos-challenge-completed/kudos-challenge-completed.html',
            controller: 'CompletedChallengesController'
        })
        .controller('CompletedChallengesController', CompletedChallengesController)

})();