(function () {

    var GivenChallengesController = function ($scope, $httpParamSerializer, GivenChallengesService, Challenges, Resources) {
        var challengeStatus = "CREATED";
        var requestData = $httpParamSerializer({
            status: challengeStatus
        });

        $scope.givenChallengesCollection = [];
        $scope.showList = false;

        $scope.showMoreInfo = showMoreInfo;
        $scope.showLessInfo = showLessInfo;
        $scope.doesDateExist = doesDateExist;
        $scope.cancelChallenge = cancelChallenge;
        $scope.checkList = checkList;
        $scope.convertDate = convertDate;
        $scope.acornPlural = acornPlural;

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

        function checkList() {
            $scope.showList = $scope.givenChallengesCollection.length > 0;
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

    GivenChallengesController.$inject = ['$scope', '$httpParamSerializer', 'GivenChallengesService', 'Challenges', 'Resources'];

    angular.module('myApp.components.givenChallenges', [])
        .component('kudosGivenChallenges', {
            templateUrl: 'app/components/kudos-given-challenges/kudos-given-challenges.html',
            controller: 'GivenChallengesController'
        })
        .controller('GivenChallengesController', GivenChallengesController)

})();