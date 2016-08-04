(function () {
    angular.module('myApp.components.challengeOngoing', [])
        .component('kudosChallengeOngoing', {
            templateUrl: 'app/components/kudos-challenges/kudos-challenge-ongoing/kudos-challenge-ongoing.html',
            controller: ('KudosChallengeOngoingController', KudosChallengeOngoingController),
            controllerAs: 'ongoingChallengesCtrl'
        });

    KudosChallengeOngoingController.$inject = ['Challenges', 'Utils', 'ChallengesPanelService'];

    function KudosChallengeOngoingController(Challenges, Utils, ChallengesPanelService) {
        var vm = this;
        var pageResponse = {first: false, last: false};
        vm.ongoingChallengeList = [];
        vm.pageParams = {page: 0, size: 5};

        vm.acornPlural = Utils.acornPlural;
        vm.convertDate = Utils.convertDate;
        vm.markChallengeAsCompleted = markChallengeAsCompleted;
        vm.markChallengeAsFailed = markChallengeAsFailed;
        vm.loadPrevousPage = loadPreviousPage;
        vm.loadNextPage = loadNextPage;

        vm.$onInit = onInit();

        function onInit() {
            getChallengeOngoingList(vm.pageParams);
        }

        function getChallengeOngoingList(pageParams) {
            vm.loading = true;
            Challenges.getOngoingChallenges(pageParams).then(function (response) {
                ChallengesPanelService.setOngoingChallengesAmount(response.totalElements);
                pageResponse = response;
                vm.ongoingChallengeList = response.content;
                checkPaginationButtons(response);
                vm.loading = false;
            });
        }

        function loadPreviousPage() {
            if (!pageResponse.first) vm.pageParams.page--;
            getChallengeOngoingList(vm.pageParams);
        }

        function loadNextPage() {
            if (!pageResponse.last) vm.pageParams.page++;
            getChallengeOngoingList(vm.pageParams);
        }

        function checkPaginationButtons(pageResponse) {
            if (pageResponse.last && !pageResponse.first && pageResponse.numberOfElements == 0){
                vm.pageParams.page--;
                getChallengeOngoingList(vm.pageParams);
            }
            vm.showMoreButton = !pageResponse.last;
            vm.showLessButton = !pageResponse.first;
        }

        function markChallengeAsCompleted(challengeId) {
            Challenges.markChallengeAsCompleted(challengeId).then(function (response) {
                if (response.status == 200){
                    getChallengeOngoingList(vm.pageParams);
                    toastr.success("Challenge marked as Completed")
                }
            })
        }

        function markChallengeAsFailed(challengeId) {
            Challenges.markChallengeAsFailed(challengeId).then(function (response) {
                if (response.status == 200){
                    getChallengeOngoingList(vm.pageParams);
                    toastr.success("Challenge marked as Failed")
                }
            })
        }

    }
})();