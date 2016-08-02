(function () {
    'use strict';
    angular
        .module('myApp.acorn', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('AcornController', AcornController);
    
        AcornController.$inject = ['Kudos', 'Challenges', 'Utils'];

        function AcornController(Kudos, Challenges, Utils) {

            var vm = this;

            vm.showLoader = true;
            vm.isAcornSelected = true;
            vm.isChallengeSelected = false;
            vm.givenKudosCollection = [];
            vm.defaultPageParams = {page: 0, size: 10};
            vm.historyString = "";

            vm.acornPlural = Utils.acornPlural;
            vm.getKudosHistory = getKudosHistory;
            vm.getReceivedKudosHistory = getReceivedKudosHistory;
            vm.getSentKudosHistory = getSentKudosHistory;
            vm.getChallengesHistory = getChallengesHistory;
            vm.getAccomplishedChallenges = getAccomplishedChallenges;
            vm.getFailedChallenges = getFailedChallenges;
            vm.toggleNavPills = toggleNavPills;
            vm.changeHistoryString = changeHistoryString;

            function activate() {
                getReceivedKudosHistory(vm.defaultPageParams);
                vm.showLoader = false;
            }
            activate();

            function getKudosHistory(pageParams) {
                Kudos.getKudosHistory(pageParams).then(function (response) {
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }

            function getReceivedKudosHistory(pageParams) {
                Kudos.getReceivedKudosHistory(pageParams).then(function (response) {
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }
            
            function getSentKudosHistory(pageParams) {
                Kudos.getSentKudosHistory(pageParams).then(function (response) {
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }

            function getChallengesHistory(pageParams) {
                Challenges.getChallengesHistory(pageParams).then(function (response) {
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }

            function getAccomplishedChallenges(pageParams) {
                Challenges.getAccomplishedChallenges(pageParams).then(function (response) {
                    changeHistoryString("accomplished challenge from");
                    vm.givenKudosCollection = response.content;
                })
            }

            function getFailedChallenges(pageParams) {
                Challenges.getFailedChallenges(pageParams).then(function (response) {
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
                }
            }

            function toggleNavPills(which) {
                switch (which){
                    case 'acorn':
                        getReceivedKudosHistory(vm.defaultPageParams);
                        vm.isChallengeSelected = false;
                        vm.isAcornSelected = true;
                        break;
                    case 'challenge':
                        getChallengesHistory(vm.defaultPageParams);
                        vm.isChallengeSelected = true;
                        vm.isAcornSelected = false;
                        break;
                }

            }
        }

    })();