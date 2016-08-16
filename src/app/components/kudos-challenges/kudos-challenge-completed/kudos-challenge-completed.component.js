(function () {
    angular
        .module('myApp.components.completedChallenges', [])
        .component('kudosChallengeCompleted', {
            templateUrl: 'app/components/kudos-challenges/kudos-challenge-completed/kudos-challenge-completed.html',
            controller: ('CompletedChallengesController', CompletedChallengesController),
            controllerAs: 'chCompleted'
        });

    CompletedChallengesController.$inject = ['Challenges', 'Resources', 'Utils', 'ChallengesPanelService'];

    function CompletedChallengesController(Challenges, Resources, Utils, ChallengesPanelService) {
        var vm = this;
        var pageResponse;

        vm.completedChallengesCollection = [];
        vm.pageParms = {page: 0, size: 5};

        vm.acornPlural = Utils.acornPlural;
        vm.checkPaginationButtons = checkPaginationButtons;
        vm.loadMoreHistoryItems = loadNextPage;
        vm.resetHistoryItems = loadPreviousPage;

        vm.$onInit = onInit();

        function onInit() {
            loadChallengesHistory(vm.pageParms);
        }

        function loadPreviousPage() {
            if (!pageResponse.first) vm.pageParms.page--;
            loadChallengesHistory(vm.pageParms);
        }

        function loadNextPage() {
            if (!pageResponse.last) vm.pageParms.page++;
            loadChallengesHistory(vm.pageParms);
        }

        function loadChallengesHistory(pageParams) {
            vm.loading = true;
            Challenges.getChallengesHistory(pageParams).then(function (response) {
                ChallengesPanelService.setCompletedChallengesAmount(response.totalElements);
                pageResponse = response;
                vm.completedChallengesCollection = response.content;
                Resources.setCompletedChallenges(response.content);
                checkPaginationButtons(response);
                vm.loading = false;
            });
        }

        function checkPaginationButtons(pageResponse) {
            vm.showMoreButton = !pageResponse.last;
            vm.showLessButton = !pageResponse.first;
        }

    }
})();