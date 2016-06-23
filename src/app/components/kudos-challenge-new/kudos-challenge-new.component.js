(function () {
    var KudosChallengeNewController = function($httpParamSerializer, $scope, KudosChallengeNewService, Challenges, Resources){
        var requestData;
        $scope.showLoaderNew = true;

        $scope.challengeList = [];


        $scope.getChallengeParticipatedList = getChallengeParticipatedList;
        $scope.acceptChallenge = acceptChallenge;
        $scope.declineChallenge = declineChallenge;
        $scope.cancelChallenge = cancelChallenge;
        $scope.removeElement = removeElement;
        $scope.refreshList = refreshList;
        $scope.acornPlural = acornPlural;
        $scope.userEmail = Resources.getCurrentUserEmail();
        $scope.doesDateExist = doesDateExist;

        $scope.convertDate = convertDate;

        getChallengeParticipatedList();

        $scope.$watch(function () {
            return Resources.getCurrentUserEmail()
        }, function (newVal) {
            if (!isValid(newVal)) $scope.userEmail = Resources.getCurrentUserEmail();
        });

        function getChallengeParticipatedList() {
            $scope.id = false;

            KudosChallengeNewService.getNewChallenges().then(function (val) {
                Resources.setNewChallenges(val);
                $scope.challengeList = Resources.getNewChallenges();
                if ($scope.challengeList[0])
                    $scope.id = true;

                $scope.showLoaderNew = false;
            });
        }

        function acceptChallenge(id, index, kudos) {
            var userAvailableKudos = Resources.getUserAvailableKudos();

            requestData = $httpParamSerializer({
                id: id
            });

            if (userAvailableKudos >=  kudos) {
                KudosChallengeNewService.accept(requestData).then(function (val) {
                    toastr.success('You accepted ' + val.data.creator + ' challenge');
                    removeElement(index);
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getOngoingChallenges().push(val.data);
                    getChallengeParticipatedList();
                    refreshList();
                })
            } else toastr.error('You only have ' + ' ' + acornPlural(userAvailableKudos) +
                '. To accept challenge, you must have at least ' + kudos);
        }

        function cancelChallenge(index) {
            var challengeId = $httpParamSerializer({
                id: $scope.challengeList[index].id
            });
            console.log(challengeId);
            console.log(index);
            Challenges.cancel(challengeId).then(function (val) {
                Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() + val.data.amount);
                Resources.getNewChallenges().splice(index, 1);
                Resources.getCompletedChallenges().push(val.data);
                console.log(Resources.getNewChallenges());
                $scope.challengeList = Resources.getNewChallenges();

                toastr.success("Challenge canceled");
            });
        }

        function declineChallenge(id, index) {
            requestData = $httpParamSerializer({
                id: id
            });
            KudosChallengeNewService.decline(requestData).then(function (val) {
                toastr.info('You declined ' + val.data.creator + ' challenge');
                removeElement(index);
                getChallengeParticipatedList();
                refreshList();
            })
        }

        function removeElement(index){
            if ($scope.challengeList[0]){
                $scope.challengeList.splice(index, 1);
            }
        }

        function refreshList(){
            $scope.id = false;
            $scope.challengeList = Resources.getNewChallenges();
            if ($scope.challengeList[0]) {
                $scope.id = true;
            }
        }
        
        function convertDate(val){
            if (val) {
                val = val.split(":");
                val = val[0] + ":" + val[1];
                return val;
            }
        }

        function doesDateExist(index) {
            return Resources.getNewChallenges()[index].finishDate == null;
        }

    };

    KudosChallengeNewController.$inject = ['$httpParamSerializer', '$scope', 'KudosChallengeNewService', 'Challenges', 'Resources'];

    angular.module('myApp.components.challengeNew', [])

        .directive('kudosChallengeNew', function () {
            return {
                controller: 'KudosChallengeNewController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-new/kudos-challenge-new.html'
            }
        })
        .controller('KudosChallengeNewController', KudosChallengeNewController)
})();