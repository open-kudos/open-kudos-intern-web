(function () {
    KudosChallengeNewController.$inject = ['$httpParamSerializer', 'Challenges', 'Resources', 'ProfileService', 'Utils'];

    angular
        .module('myApp.components.challengeNew', [])
        .component('kudosChallengeNew', {
            templateUrl: 'app/components/kudos-challenge-new/kudos-challenge-new.html',
            controller: ('KudosChallengeNewController', KudosChallengeNewController),
            controllerAs: 'chNew'
        });

    function KudosChallengeNewController($httpParamSerializer, Challenges, Resources, ProfileService, Utils){
        var vm = this,
            requestData;

        vm.showLoaderNew = true;
        vm.challengeList = [];
        
        vm.getChallengeParticipatedList = getChallengeParticipatedList;
        vm.acceptChallenge = acceptChallenge;
        vm.declineChallenge = declineChallenge;
        vm.cancelChallenge = cancelChallenge;
        vm.removeElement = removeElement;
        vm.acornPlural = Utils.acornPlural;
        vm.userEmail = Resources.getCurrentUserEmail();
        vm.doesDateExist = doesDateExist;
        vm.convertDate = convertDate;

        vm.$onInit = onInit();

        function onInit() {
            getChallengeParticipatedList();

            if(!Resources.getCurrentUserEmail()){
                ProfileService.userHome().then(function (val) {
                    Resources.setCurrentUserEmail(val.email);
                    vm.userEmail = Resources.getCurrentUserEmail();
                });
            } else {
                vm.userEmail = Resources.getCurrentUserEmail();
            }
        }

        function getChallengeParticipatedList() {
            vm.id = false;

            Challenges.getNewChallenges().then(function (val) {
                Resources.setNewChallenges(val);
                vm.challengeList = Resources.getNewChallenges();
                vm.showLoaderNew = false;
            });
        }

        function acceptChallenge(id, index, kudos) {
            var userAvailableKudos = Resources.getUserAvailableKudos();

            requestData = $httpParamSerializer({
                id: id
            });

            if (userAvailableKudos >=  kudos) {
                Challenges.acceptChallenge(requestData).then(function (val) {
                    toastr.success('You accepted ' + val.data.creatorName + ' challenge');
                    removeElement(index);
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getOngoingChallenges().push(val.data);
                    getChallengeParticipatedList();
                    vm.challengeList = Resources.getNewChallenges();
                })
            } else toastr.error('You only have ' + ' ' + acornPlural(userAvailableKudos) +
                '. To accept challenge, you must have at least ' + kudos);
        }

        function cancelChallenge(index) {
            var challengeId = $httpParamSerializer({
                id: vm.challengeList[index].id
            });
            Challenges.cancelChallenge(challengeId).then(function (val) {
                Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() + val.data.amount);
                Resources.getNewChallenges().splice(index, 1);
                Resources.getCompletedChallenges().unshift(val.data);
                vm.challengeList = Resources.getNewChallenges();
                toastr.success("Challenge canceled");
            });
        }

        function declineChallenge(id, index) {
            requestData = $httpParamSerializer({
                id: id
            });
            Challenges.declineChallenge(requestData).then(function (val) {
                toastr.info('You declined ' + val.data.creator + ' challenge');
                removeElement(index);
                getChallengeParticipatedList();
                refreshList();
            })
        }

        function removeElement(index){
            if (vm.challengeList[0]){
                vm.challengeList.splice(index, 1);
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
    }
})();