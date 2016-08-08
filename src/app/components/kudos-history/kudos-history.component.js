(function () {
    angular
        .module('myApp.components.history', [])
        .component('kudosHistory', {
            templateUrl: 'app/components/kudos-history/kudos-history.html',
            bindings: {
                id: '='
            },
            controller: ('HistoryController', HistoryController),
            controllerAs: 'history'
        });

    HistoryController.$inject = ['Kudos', 'Challenges', 'Utils', 'User'];

    function HistoryController(Kudos, Challenges, Utils, User) {
        var vm = this;
        var pageResponse;
        vm.showLoader = true;
        vm.isAcornSelected = true;
        vm.isChallengeSelected = false;
        vm.givenKudosCollection = [];
        vm.defaultPageParams = {page: 0, size: 10};
        vm.historyString = "";
        vm.selectedLoadMethod = null;

        vm.acornPlural = Utils.acornPlural;
        vm.getKudosHistory = getKudosHistory;
        vm.getReceivedKudosHistory = getReceivedKudosHistory;
        vm.getSentKudosHistory = getSentKudosHistory;
        vm.getChallengesHistory = getChallengesHistory;
        vm.getAccomplishedChallenges = getAccomplishedChallenges;
        vm.getFailedChallenges = getFailedChallenges;
        vm.toggleNavPills = toggleNavPills;
        vm.changeHistoryString = changeHistoryString;

        vm.checkPaginationButtons = checkPaginationButtons;
        vm.loadNextPage = loadNextPage;
        vm.loadPreviousPage = loadPreviousPage;
        vm.setDefaultPageParams = setDefaultPageParams;
        vm.isSelectedUserEqualsCurrentUser = isSelectedUserEqualsCurrentUser;

        vm.$onInit = onInit();

        function onInit() {
            vm.userId = vm.id;
            console.log(vm.userId);
            getKudosHistory(vm.defaultPageParams);
            if(isSelectedUserEqualsCurrentUser()){
                loadSelectedUser(vm.userId);
            }
            vm.showLoader = false;
        }

        function loadPreviousPage() {
            if (!pageResponse.first) vm.defaultPageParams.page--;
            vm.selectedLoadMethod(vm.defaultPageParams);
        }

        function loadNextPage() {
            if (!pageResponse.last) vm.defaultPageParams.page++;
            vm.selectedLoadMethod(vm.defaultPageParams);
        }

        function checkPaginationButtons(response) {
            pageResponse = response;
            vm.showMoreButton = !response.last;
            vm.showLessButton = !response.first;
        }
        
        function loadSelectedUser(id) {
            User.getUserProfile(id).then(function (userProfile) {
                vm.selectedUser = userProfile;
                console.log(userProfile);
            })
        }

        function getKudosHistory(pageParams) {
            vm.selectedLoadMethod = getKudosHistory;
            Kudos.getUserKudosHistory(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                vm.givenKudosCollection = response.content;
                vm.showLoader = false;
            })
        }

        function getReceivedKudosHistory(pageParams) {
            vm.selectedLoadMethod = getReceivedKudosHistory;
            Kudos.getUserReceivedKudosHistory(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                vm.givenKudosCollection = response.content;
                vm.showLoader = false;
            })
        }

        function getSentKudosHistory(pageParams) {
            vm.selectedLoadMethod = getSentKudosHistory;
            Kudos.getUserSentKudosHistory(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                vm.givenKudosCollection = response.content;
                vm.showLoader = false;
            })
        }

        function getChallengesHistory(pageParams) {
            vm.selectedLoadMethod = getChallengesHistory;
            Challenges.getUserChallengesHistory(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                vm.givenKudosCollection = response.content;
                vm.showLoader = false;
            })
        }

        function getAccomplishedChallenges(pageParams) {
            vm.selectedLoadMethod = getAccomplishedChallenges;
            Challenges.getUserAccomplishedChallenges(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                changeHistoryString("accomplished challenge from");
                vm.givenKudosCollection = response.content;
            })
        }

        function getFailedChallenges(pageParams) {
            vm.selectedLoadMethod = getFailedChallenges;
            Challenges.getUserFailedChallenges(vm.userId, pageParams).then(function (response) {
                checkPaginationButtons(response);
                changeHistoryString("failed challenge from");
                vm.givenKudosCollection = response.content;
            })
        }

        function changeHistoryString(value) {
            switch (value){
                case 'RECEIVED':
                    return "received from";
                case 'GIVEN' || 'UNKNOWN' :
                    return "gave to";
                case 'ACCOMPLISHED' :
                    return 'accomplished challenge from';
                case 'FAILED' :
                    return 'failed challenge from';
                case 'UNKNOWN' :
                    return 'received from';
            }
        }

        function toggleNavPills(which) {
            switch (which){
                case 'acorn':
                    setDefaultPageParams();
                    getKudosHistory(vm.defaultPageParams);
                    vm.isChallengeSelected = false;
                    vm.isAcornSelected = true;
                    break;
                case 'challenge':
                    setDefaultPageParams();
                    getChallengesHistory(vm.defaultPageParams);
                    vm.isChallengeSelected = true;
                    vm.isAcornSelected = false;
                    break;
            }
        }

        function setDefaultPageParams() {
            vm.defaultPageParams = {page: 0, size: 10};
        }

        function isSelectedUserEqualsCurrentUser() {
            return vm.userId != User.getCurrentUser().id
        }
    }
})();



///HistoryController