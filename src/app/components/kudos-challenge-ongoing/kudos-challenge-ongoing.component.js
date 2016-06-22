(function () {

    var KudosChallengeOngoingController = function ($httpParamSerializer, $scope, KudosChallengeOngoingService, Resources) {
        var requestData;

        $scope.showList = false;
        $scope.ongoingChallengeList = [];

        $scope.getChallengeOngoingList = getChallengeOngoingList;
        $scope.won = won;
        $scope.lost = lost;
        $scope.convertDate = convertDate;
        $scope.showButtons = showButtons;
        $scope.isSelected = isSelected;

        getChallengeOngoingList();

        function getChallengeOngoingList() {
            KudosChallengeOngoingService.getOngoingChallenges().then(function (val) {
                Resources.setOngoingChallenges(val);
                $scope.ongoingChallengeList = Resources.getOngoingChallenges();
            });
        }

        function lost(id) {
            var status = false;

            requestData = $httpParamSerializer({
                id: id,
                status: status
            });

            KudosChallengeOngoingService.accomplish(requestData).then(function (val) {
                toastr.success('You think that you lost challenge. Well... maybe not!');
            })
        }

        function won(id) {
            var status = true;

            requestData = $httpParamSerializer({
                id: id,
                status: status
            });

            KudosChallengeOngoingService.accomplish(requestData).then(function (val) {
                toastr.success('You think that you won challenge. Well... maybe not!');
            })
        }

        function showButtons (list) {
            $scope.userEmail = Resources.getCurrentUserEmail();

            if (list.creator == $scope.userEmail)
                return list.creatorStatus == null;

            if (list.participant == $scope.userEmail)
                return list.participantStatus == null;
        }

        function isSelected(list) {
            $scope.userEmail = Resources.getCurrentUserEmail();
            if (list.creator == $scope.userEmail) {
                if (list.participantStatus == false) return $scope.selectedMessage = list.participant + " thinks he lost";
                else if (list.participantStatus == true) return $scope.selectedMessage = list.participant + " thinks he won";
                else return false;
            } else if (list.participant == $scope.userEmail) {
                if (list.creatorStatus == false) return $scope.selectedMessage = list.creator + " thinks he lost";
                else if (list.creatorStatus == true) return $scope.selectedMessage = list.creator + " thinks he won";
                else return false;
            }
        }

        $scope.$watch(function () {
            $scope.showList = $scope.ongoingChallengeList.length > 0;
            return Resources.getOngoingChallenges()
        }, function () {
        });

        function convertDate(val){
            val = val.split(":");
            val = val[0] + ":" + val[1];
            return val;
        }
    };

    KudosChallengeOngoingController.$inject = ['$httpParamSerializer', '$scope', 'KudosChallengeOngoingService', 'Resources'];

    angular.module('myApp.components.challengeOngoing', [])
        .directive('kudosChallengeOngoing', function () {
            return {
                controller: 'KudosChallengeOngoingController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-ongoing/kudos-challenge-ongoing.html'
            }
        })
        .controller('KudosChallengeOngoingController', KudosChallengeOngoingController)
})();