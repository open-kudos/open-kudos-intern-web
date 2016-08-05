(function () {
    angular.module('myApp.components.challengeNew', [])
        .component('kudosChallengeNew', {
            templateUrl: 'app/components/kudos-challenges/kudos-challenge-new/kudos-challenge-new.html',
            controller: ('KudosChallengeNewController', KudosChallengeNewController),
            controllerAs: 'chNew'
        });

    KudosChallengeNewController.$inject = ['Challenges', 'Resources', 'Utils', 'ChallengesPanelService'];

    function KudosChallengeNewController(Challenges, Resources, Utils, ChallengesPanelService){
        var vm = this;
        var pageResponse;

        vm.loading = true;
        vm.challengeList = [];
        vm.pageParams = {page: 0, size: 5};

        vm.acornPlural = Utils.acornPlural;
        vm.convertDate = Utils.convertDate;
        vm.acceptChallenge = acceptChallenge;
        vm.declineChallenge = declineChallenge;
        vm.cancelChallenge = cancelChallenge;
        vm.isChallengeExpirationDateExists = isChallengeExpirationDateExists;
        vm.loadNextPage = loadNextPage;
        vm.loadPreviousPage = loadPreviousPage;

        vm.$onInit = onInit();

        function onInit() {
            loadSentAndReceivedChallenges(vm.pageParams);
        }

        function loadPreviousPage() {
            if (!pageResponse.first) vm.pageParams.page--;
            loadSentAndReceivedChallenges(vm.pageParams);
        }

        function loadNextPage() {
            if (!pageResponse.last) vm.pageParams.page++;
            loadSentAndReceivedChallenges(vm.pageParams);
        }

        function loadSentAndReceivedChallenges(pageParams) {
            vm.loading = true;
            Challenges.getSentAndReceived(pageParams).then(function (response) {
                ChallengesPanelService.setNewChallengesAmount(response.totalElements);
                console.log(response.totalElements);
                Resources.setNewChallenges(response.content);
                checkPaginationButtons(response);
                pageResponse = response;
                vm.challengeList = response.content;
                vm.loading = false;
            });
        }

        function checkPaginationButtons(pageResponse) {
            if (pageResponse.last && !pageResponse.first && pageResponse.numberOfElements == 0){
                vm.pageParams.page--;
                loadSentAndReceivedChallenges(vm.pageParams);
            }
            vm.showMoreButton = !pageResponse.last;
            vm.showLessButton = !pageResponse.first;
        }

        function acceptChallenge(id, kudos) {
            var userAvailableKudos = Resources.getUserAvailableKudos();
            vm.loading = true;
            if (userAvailableKudos >=  kudos) {
                Challenges.acceptChallenge(id).then(function (val) {
                    vm.loading = false;
                    toastr.success('You accepted ' + val.data.creatorFullName + ' challenge');
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    loadSentAndReceivedChallenges(vm.pageParams);
                })
            } else {toastr.error('You only have ' + ' ' + vm.acornPlural(userAvailableKudos) +
                '. To accept challenge, you must have at least ' + kudos);
                vm.loading = true;
            }
        }

        function declineChallenge(id) {
            vm.loading = true;
            Challenges.declineChallenge(id).then(function (val) {
                vm.loading = false;
                toastr.info('You declined ' + val.data.creatorFullName + ' challenge');
                loadSentAndReceivedChallenges(vm.pageParams);
            })
        }

        function cancelChallenge(id) {
            vm.loading = true;
            Challenges.cancelChallenge(id).then(function (val) {
                vm.loading = false;
                Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() + val.data.amount);
                loadSentAndReceivedChallenges(vm.pageParams);
                toastr.success("Challenge canceled");
            });
        }
        
        function isChallengeExpirationDateExists(challenge) {
            return challenge.finishDate == null;
        }
    }
})();