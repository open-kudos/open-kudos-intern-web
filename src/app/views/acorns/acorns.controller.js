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
            vm.getReceivedKudosHistory = getReceivedKudosHistory;
            vm.getSentKudosHistory = getSentKudosHistory;
            vm.getAccomplishedChallenges = getAccomplishedChallenges;
            vm.getFailedChallenges = getFailedChallenges;
            vm.toggleNavPills = toggleNavPills;

            function activate() {
                getReceivedKudosHistory(vm.defaultPageParams);
                vm.showLoader = false;
            }
            activate();

            function getReceivedKudosHistory(pageParams) {
                Kudos.getReceivedKudosHistory(pageParams).then(function (response) {
                    changeHistoryString("received from");
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }
            
            function getSentKudosHistory(pageParams) {
                Kudos.getSentKudosHistory(pageParams).then(function (response) {
                    changeHistoryString("gave to");
                    vm.givenKudosCollection = response.content;
                    vm.showLoader = false;
                })
            }

            function getAccomplishedChallenges() {
                Challenges.getAccomplishedChallenges().then(function (response) {
                    changeHistoryString("accomplished challenge from");
                    vm.givenKudosCollection = response;
                })
            }

            function getFailedChallenges() {
                Challenges.getFailedChallenges().then(function (response) {
                    changeHistoryString("failed challenge from");
                    vm.givenKudosCollection = response;
                })
            }

            function changeHistoryString(value) {
                vm.historyString = value;
            }

            function toggleNavPills(which) {
                switch (which){
                    case 'acorn':
                        getReceivedKudosHistory(vm.defaultPageParams);
                        vm.isChallengeSelected = false;
                        vm.isAcornSelected = true;
                        break;
                    case 'challenge':
                        getAccomplishedChallenges();
                        vm.isChallengeSelected = true;
                        vm.isAcornSelected = false;
                        break;
                }

            }
        }

    })();