(function () {

    KudosChallengeOngoingController.$inject = ['$httpParamSerializer', 'Challenges', 'Resources', 'ProfileService', 'Utils'];

    angular.module('myApp.components.challengeOngoing', [])
        .component('kudosChallengeOngoing', {
            templateUrl: 'app/components/kudos-challenge-ongoing/kudos-challenge-ongoing.html',
            controller: ('KudosChallengeOngoingController', KudosChallengeOngoingController),
            controllerAs: 'chOngoing'
        });

    function KudosChallengeOngoingController($httpParamSerializer, Challenges, Resources, ProfileService, Utils) {
        var vm = this,
            requestData;

        vm.ongoingChallengeList = [];

        vm.getChallengeOngoingList = getChallengeOngoingList;
        vm.won = won;
        vm.lost = lost;
        vm.convertDate = convertDate;
        vm.showButtons = showButtons;
        vm.isSelected = isSelected;
        vm.acornPlural = Utils.acornPlural;
        vm.convertDate = convertDate;

        vm.$onInit = onInit();

        function onInit() {
            getChallengeOngoingList();

            if(!Resources.getCurrentUserEmail()){
                ProfileService.userHome().then(function (val) {
                    Resources.setCurrentUserEmail(val.email);
                    vm.userEmail = Resources.getCurrentUserEmail();
                });
            } else {
                vm.userEmail = Resources.getCurrentUserEmail();
            }
        }

        function getChallengeOngoingList() {
            Challenges.getOngoingChallenges().then(function (val) {
                Resources.setOngoingChallenges(val);
                vm.ongoingChallengeList = Resources.getOngoingChallenges();
            });
        }

        function lost(id) {
            var status = false;

            requestData = $httpParamSerializer({
                id: id,
                status: status
            });

            Challenges.accomplishChallenge(requestData).then(function (val) {
                toastr.success('You think that you lost challenge. Well... maybe not!');
            })
        }

        function won(id) {
            var status = true;

            requestData = $httpParamSerializer({
                id: id,
                status: status
            });

            Challenges.accomplishChallenge(requestData).then(function (val) {
                toastr.success('You think that you won challenge. Well... maybe not!');
            })
        }

        function showButtons (list) {
            vm.userEmail = Resources.getCurrentUserEmail();

            if (list.creatorEmail == vm.userEmail)
                return list.creatorStatus == null;

            if (list.participantEmail == vm.userEmail)
                return list.participantStatus == null;
        }

        function isSelected(list) {
            if (list.creatorEmail == vm.userEmail) {
                if (list.participantStatus == false) return vm.selectedMessage = list.participantEmail + " thinks he lost";
                else if (list.participantStatus == true) return vm.selectedMessage = list.participantEmail + " thinks he won";
                else return false;
            } else if (list.participantEmail == vm.userEmail) {
                if (list.creatorStatus == false) return vm.selectedMessage = list.creatorEmail + " thinks he lost";
                else if (list.creatorStatus == true) return vm.selectedMessage = list.creatorEmail + " thinks he won";
                else return false;
            }
        }

        function convertDate(val){
            val = val.split(":");
            val = val[0] + ":" + val[1];
            return val;
        }
    }
})();