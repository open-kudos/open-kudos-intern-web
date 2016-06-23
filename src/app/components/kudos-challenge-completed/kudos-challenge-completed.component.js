(function () {

    var CompletedChallengesController = function ($scope, $httpParamSerializer, CompletedChallengesService, Challenges, Resources) {

        $scope.completedChallengesCollection = [];
        $scope.showList = false;

        $scope.checkList = checkList;
        $scope.acornPlural = acornPlural;
        $scope.getWinner = getWinner;
        $scope.userEmail = Resources.getCurrentUserEmail();
        $scope.showMore = showMore;
        $scope.showLess = showLess;
        $scope.showMoreButton = showMoreButton;
        var showMoreLimit = 5;
        $scope.completedChallengesLimit = 5;

        CompletedChallengesService.completedChallenges().then(function (val) {
            Resources.setCompletedChallenges(val);
            $scope.completedChallengesCollection = Resources.getCompletedChallenges();
        });

        $scope.$watch(function () {
            return Resources.getCurrentUserEmail()
        }, function (newVal) {
            if (!isValid(newVal)) $scope.userEmail = Resources.getCurrentUserEmail();
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
                if (Resources.getCompletedChallenges()[index].creator == Resources.getCurrentUserEmail) return "You won the challenge!"
                else return Resources.getCompletedChallenges()[index].creator + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].creatorStatus == false){
                if (Resources.getCompletedChallenges()[index].creator == Resources.getCurrentUserEmail) return Resources.getCompletedChallenges()[index].participant + " won the challenge";
                else return "You won the challenge!"
            }

            if (Resources.getCompletedChallenges()[index].participantStatus) {
                if (Resources.getCompletedChallenges()[index].participant == Resources.getCurrentUserEmail()) return "You won the challenge!"
                else return Resources.getCompletedChallenges()[index].participant + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].participantStatus == false){
                if (Resources.getCompletedChallenges()[index].participant == Resources.getCurrentUserEmail()) return Resources.getCompletedChallenges()[index].creator + " won the challenge";
                else return "You won the challenge!"
            }
        }

        function showMoreButton(val) {
            if (val.length > 5) {
                $scope.showMoreButton = true;
            } else {
                $scope.showMoreButton = false;
            }
        }

        function showMore() {
            if ($scope.completedChallengesLimit <= Resources.getCompletedChallenges().length) {
                $scope.completedChallengesLimit += showMoreLimit;
            }
        }

        function showLess() {
            $scope.completedChallengesLimit = showMoreLimit;
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