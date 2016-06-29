(function () {
    UserHistoryController.$inject = ['UserHistoryService', '$timeout'];

    angular
        .module('myApp.components.userHistory', [])
        .component('kudosUserHistory', {
            template: '<ng-include src="history.getTemplate()"/>' ,
            bindings: {
                user: '=',
                page: '<'
            },
            controller: ('UserHistoryController', UserHistoryController),
            controllerAs: 'history'
        });

    function UserHistoryController(UserHistoryService, $timeout){
        var self = this;

        self.showHistoryLoader = true;
        self.historyRadioBox = 'wonLost';
        self.receivedOperations = false;
        self.allOperations = true;
        self.gaveOperations = false;
        self.challengeOperations = false;
        self.transactionEndingIndex = 6;
        self.transactionStartingIndex = 0;
        self.showMoreButton = false;
        self.showLessButton = false;

        self.split = split;
        self.acornPlural = acornPlural;
        self.changeRadioValue = changeRadioValue;
        self.changeView = changeView;
        self.checkButtons = checkButtons;
        self.showMoreLess = showMoreLess;
        self.updateListAll = updateListAll;
        self.updateListReceived = updateListReceived;
        self.updateListGave = updateListGave;
        self.updateListChallenges = updateListChallenges;
        self.showList = showList;
        self.getTemplate = getTemplate;

        self.$onInit = function() {
            self.currentUser = self.user;
            if (self.page == true){
                updateListAll(self.currentUser.email, true);
            }
            self.modalIndex = split(self.user.$$hashKey, ":")[1];
        };

        function updateListAll(email, trigger){
            spin();
            self.showHistoryLoader = true;
            self.thisUsersEmail = email;
            var requestData = {
                email: self.thisUsersEmail,
                start: self.transactionStartingIndex,
                end: self.transactionEndingIndex
            };

            if (!UserHistoryService.getAll(requestData, trigger)) {
                UserHistoryService.getAllTransactions(requestData).then(function (val) {
                    self.transactionHistory = val;
                    UserHistoryService.setAll(self.thisUsersEmail, self.transactionHistory);
                    checkButtons(self.transactionHistory);
                    self.showHistoryLoader = false;
                });
            } else {
                self.transactionHistory = UserHistoryService.getAll(requestData, trigger);
                checkButtons(self.transactionHistory);
                self.showHistoryLoader = false;
            }
        }

        function updateListReceived(email, trigger){
            spin();
            self.showHistoryLoader = true;
            self.thisUsersEmail = email;
            var requestData = {
                email: self.thisUsersEmail,
                start: self.transactionStartingIndex,
                end: self.transactionEndingIndex
            };

            if (!UserHistoryService.getReceived(requestData, trigger)) {
                UserHistoryService.getReceivedTransactions(requestData).then(function (val) {
                    self.transactionHistory = val;
                    UserHistoryService.setReceived(self.thisUsersEmail, val);
                    checkButtons(self.transactionHistory);
                    self.showHistoryLoader = false;
                });
            } else {
                self.transactionHistory = UserHistoryService.getReceived(requestData, trigger);
                checkButtons(self.transactionHistory);
                self.showHistoryLoader = false;
            }
        }

        function updateListGave(email, trigger){
            spin();
            self.showHistoryLoader = true;
            self.thisUsersEmail = email;
            var requestData = {
                email: self.thisUsersEmail,
                start: self.transactionStartingIndex,
                end: self.transactionEndingIndex
            };

            if (!UserHistoryService.getGave(requestData, trigger)) {
                UserHistoryService.getGaveTransactions(requestData).then(function (val) {
                    self.transactionHistory = val;
                    UserHistoryService.setGave(self.thisUsersEmail, val);
                    checkButtons(self.transactionHistory);
                    self.showHistoryLoader = false;
                });
            } else {
                self.transactionHistory = UserHistoryService.getGave(requestData, trigger);
                checkButtons(self.transactionHistory);
                self.showHistoryLoader = false;
            }
        }

        function updateListChallenges(email, trigger){
            spin();
            self.showHistoryLoader = true;
            self.thisUsersEmail = email;
            var requestData = {
                email: self.thisUsersEmail,
                start: self.transactionStartingIndex,
                end: self.transactionEndingIndex
            };

            if (!UserHistoryService.getChallenges(requestData, trigger)) {
                UserHistoryService.getChallengesTransactions(requestData).then(function (val) {
                    self.transactionHistory = val;
                    UserHistoryService.setChallenges(self.thisUsersEmail, val);
                    checkButtons(self.transactionHistory);
                    self.showHistoryLoader = false;
                });
            } else {
                self.transactionHistory = UserHistoryService.getChallenges(requestData, trigger);
                checkButtons(self.transactionHistory);
                self.showHistoryLoader = false;
            }
        }
        
        function checkButtons(val) {
            if (val[self.transactionEndingIndex - 1]) self.showMoreButton = true;
            else self.showMoreButton = false;
        }

        function showMoreLess(val) {
            if (val == 'more'){
                self.transactionEndingIndex += 10;
                self.showLessButton = true;

                if (self.allOperations) updateListAll(self.thisUsersEmail, false);
                else if (self.receivedOperations) updateListReceived(self.thisUsersEmail, false);
                else if (self.gaveOperations) updateListGave(self.thisUsersEmail, false);
                else if (self.challengeOperations) updateListChallenges(self.thisUsersEmail, false);
            }

            if (val == 'less') {
                self.transactionEndingIndex = 6;
                self.showMoreButton = true;
                self.showLessButton = false;
            }
        }
        
        function showList(email, trigger) {
            self.transactionEndingIndex = 6;

            if (self.allOperations) updateListAll(email, trigger);
            else if (self.receivedOperations) updateListReceived(email, trigger);
            else if (self.gaveOperations) updateListGave(email, trigger);
            else if (self.challengeOperations) updateListChallenges(email, trigger);
        }

        function changeRadioValue(value) {
            if (self.historyRadioBox != value) {
                self.historyRadioBox = value;
            }
        }

        function changeView(value) {
            self.receivedOperations = false;
            self.allOperations = false;
            self.gaveOperations = false;
            self.challengeOperations = false;

            switch (value){
                case 'all':
                    self.allOperations = true;
                    break;
                case 'received':
                    self.receivedOperations=true;
                    break;
                case 'gave':
                    self.gaveOperations=true;
                    break;
                case 'challenges':
                    self.challengeOperations=true;
                    break;
            }

            self.showLessButton = false;
            self.transactionEndingIndex = 6;
            self.historyRadioBox = 'wonLost';
        }

        function getTemplate(page) {
            if (self.page == true){
                return 'app/components/kudos-user-history/kudos-user-history-page.html';
            } else {
                return 'app/components/kudos-user-history/kudos-user-history.html';
            }
        }

        function spin() {
            $timeout(function () {
                self.spin = false;
            }, 1000);
        }
    }
})();