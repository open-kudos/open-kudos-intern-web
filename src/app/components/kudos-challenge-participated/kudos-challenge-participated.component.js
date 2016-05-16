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

        .controller('KudosChallengeParticipatedController', function ($httpParamSerializer, $scope, KudosChallengeParticipatedService, Resources) {
            var requestData;

            $scope.challengeList = [];
            $scope.challengeFullList = [];
            $scope.allChallengeList = [];
            $scope.showAllReceived = false;

            $scope.getChallengeParticipatedList = getChallengeParticipatedList;
            $scope.acceptChallenge = acceptChallenge;
            $scope.declineChallenge = declineChallenge;
            $scope.removeElement = removeElement;
            $scope.refreshList = refreshList;
            $scope.acornPlural = acornPlural;
            $scope.getAllChallengeParticipatedList = getAllChallengeParticipatedList;
            $scope.convertDate = convertDate;

            getChallengeParticipatedList();

            function getChallengeParticipatedList() {
                var challengeStatus = "CREATED";
                requestData = $httpParamSerializer({
                    status: challengeStatus,
                    page: 0,
                    pageSize: 2
                });
                $scope.id = false;

                KudosChallengeParticipatedService.getList(requestData).then(function (val) {
                    $scope.challengeList = val;
                    refreshList();
                })
            }

            function getAllChallengeParticipatedList() {
                var challengeStatus = "CREATED";
                requestData = $httpParamSerializer({
                    status: challengeStatus
                });

                KudosChallengeParticipatedService.getFullList(requestData).then(function (val) {
                    $scope.challengeFullList = val;
                })
            }

            function acceptChallenge(id, index, kudos) {
                var userAvailableKudos = Resources.getUserAvailableKudos();
                
                requestData = $httpParamSerializer({
                    id: id
                });

                if (userAvailableKudos >=  kudos) {
                    KudosChallengeParticipatedService.accept(requestData).then(function (val) {
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

            function declineChallenge(id, index) {
                requestData = $httpParamSerializer({
                    id: id
                });
                KudosChallengeParticipatedService.decline(requestData).then(function (val) {
                    toastr.info('You declined ' + val.data.creator + ' challenge');
                    removeElement(index);
                    getChallengeParticipatedList();
                    refreshList();
                })
            }

            function removeElement(index){
                if ($scope.challengeFullList[0]){
                    $scope.challengeFullList.splice(index, 1);
                }
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

                $scope.showAllReceived = !!$scope.challengeList[1];
            }

            function acornPlural(amount) {
                return amount > 1 ? amount + " Acorns" : amount + " Acorn"
            }

            function convertDate(val){
                if (val) {
                    val = val.split(":");
                    val = val[0] + ":" + val[1];
                    return val;
                }
            }
        });
})();