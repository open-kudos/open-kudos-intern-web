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
        vm.buttons = [];
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

        function lost(challenge) {
            var status = false;
            var index = vm.ongoingChallengeList.indexOf(challenge);
            requestData = $httpParamSerializer({
                id: challenge.id,
                status: status
            });

            Challenges.accomplishChallenge(requestData).then(function (val) {
                if(val.data.status === "ACCOMPLISHED"){
                    vm.ongoingChallengeList.splice(index, 1);
                }else {
                    toastr.success('You think that you won challenge. Well... maybe not!');
                    vm.buttons[index] = true;
                }
            })
        }

        function won(challenge) {
            var status = true;
            var index = vm.ongoingChallengeList.indexOf(challenge);
            requestData = $httpParamSerializer({
                id: challenge.id,
                status: status
            });

            Challenges.accomplishChallenge(requestData).then(function (val) {
                if(val.data.status === "ACCOMPLISHED"){
                    vm.ongoingChallengeList.splice(index, 1);
                }else {
                    toastr.success('You think that you won challenge. Well... maybe not!');
                    vm.buttons[index] = true;
                }
            })
        }

        function showButtons (challenge) {
            vm.userEmail = Resources.getCurrentUserEmail();
            if (challenge.creatorEmail == vm.userEmail)
                return challenge.creatorStatus == null;
            if (challenge.participantEmail == vm.userEmail)
                return challenge.participantStatus == null;
        }

        function isSelected(challenge) {
            if (challenge.creatorEmail == vm.userEmail) {
                if (challenge.participantStatus == false) return vm.selectedMessage = challenge.participantEmail + " thinks he lost";
                else if (challenge.participantStatus == true) return vm.selectedMessage = challenge.participantEmail + " thinks he won";
                else return false;
            } else if (challenge.participantEmail == vm.userEmail) {
                if (challenge.creatorStatus == false) return vm.selectedMessage = challenge.creatorEmail + " thinks he lost";
                else if (challenge.creatorStatus == true) return vm.selectedMessage = challenge.creatorEmail + " thinks he won";
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