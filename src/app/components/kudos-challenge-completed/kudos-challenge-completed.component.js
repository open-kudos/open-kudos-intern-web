(function () {

    var CompletedChallengesController = function ($scope, $httpParamSerializer, CompletedChallengesService, Challenges, Resources) {

        $scope.completedChallengesCollection = [];
        $scope.showList = false;

        $scope.checkList = checkList;
        $scope.acornPlural = acornPlural;
        $scope.getWinner = getWinner;

        CompletedChallengesService.completedChallenges().then(function (val) {
            Resources.setCompletedChallenges(val);
            $scope.completedChallengesCollection = Resources.getCompletedChallenges();
        });

        function checkList() {
            $scope.showList = $scope.completedChallengesCollection.length > 0;
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

        $scope.$watch(function () {
            checkList();
        });

        function getWinner(index) {
            if (Resources.getCompletedChallenges()[index].creatorStatus) {
                if (Resources.getCompletedChallenges()[index].creator == Resources.getCurrentUserEmail) {
                    return "You won the challenge!"
                } else {
                    return Resources.getCompletedChallenges()[index].creator + " won the challenge";
                }
            }

            if (Resources.getCompletedChallenges()[index].participantStatus) {
                if (Resources.getCompletedChallenges()[index].participant == Resources.getCurrentUserEmail()) {
                    return "You won the challenge!"
                } else {
                    return Resources.getCompletedChallenges()[index].participant + " won the challenge";
                }
            }
        }

    };

    CompletedChallengesController.$inject = ['$scope', '$httpParamSerializer', 'CompletedChallengesService', 'Challenges', 'Resources'];

    angular.module('myApp.components.completedChallenges', [])
        .component('kudosChallengeCompleted', {
            templateUrl: 'app/components/kudos-challenge-completed/kudos-challenge-completed.html',
            controller: 'CompletedChallengesController'
        })
        .controller('CompletedChallengesController', CompletedChallengesController)

})();