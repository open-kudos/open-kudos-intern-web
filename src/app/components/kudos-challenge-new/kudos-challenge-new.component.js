(function () {
    var KudosChallengeNewController = function($httpParamSerializer, $scope, KudosChallengeNewService, Resources){
        var requestData;

        $scope.challengeList = [];


        $scope.getChallengeParticipatedList = getChallengeParticipatedList;
        $scope.acceptChallenge = acceptChallenge;
        $scope.declineChallenge = declineChallenge;
        $scope.removeElement = removeElement;
        $scope.refreshList = refreshList;
        $scope.acornPlural = acornPlural;

        $scope.convertDate = convertDate;

        getChallengeParticipatedList();

        function getChallengeParticipatedList() {
            $scope.id = false;

            KudosChallengeNewService.getNewChallenges().then(function (val) {
                Resources.setNewChallenges(val);
                $scope.challengeList = Resources.getNewChallenges();
                if ($scope.challengeList[0])
                    $scope.id = true;
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
    };

    KudosChallengeNewController.$inject = ['$httpParamSerializer', '$scope', 'KudosChallengeNewService', 'Resources'];

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