(function () {
    var UserHistoryController = function(Resources, UserHistoryService){
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

        this.$onInit = function() {
            self.currentUser = this.user;
            self.modalIndex = split(this.user.$$hashKey, ":")[1];
        };

        function updateListAll(email, trigger){
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
                self.transactionEndingIndex += 5;
                self.showLessButton = true;
                updateListAll(self.thisUsersEmail, false);
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
            if (value == 'all') {
                self.receivedOperations = false;
                self.allOperations = true;
                self.gaveOperations = false;
                self.challengeOperations = false;
            } else if (value == 'received'){
                self.receivedOperations=true;
                self.allOperations=false;
                self.gaveOperations=false;
                self.challengeOperations=false;
            } else if (value == 'gave'){
                self.receivedOperations=false;
                self.allOperations=false;
                self.gaveOperations=true;
                self.challengeOperations=false;
            } else if (value == 'challenges'){
                self.receivedOperations=false;
                self.allOperations=false;
                self.gaveOperations=false;
                self.challengeOperations=true;
            }
            self.historyRadioBox = 'wonLost';
        }

        $('#history'+self.modalIndex).on('hidden', function () {
            console.log('nx');
            self.transactionEndingIndex = 5;
        })
    };

    UserHistoryController.$inject = ['Resources', 'UserHistoryService'];

    angular.module('myApp.components.userHistory', [])
        .component('kudosUserHistory', {
            templateUrl: 'app/components/kudos-user-history/kudos-user-history.html',
            bindings: {
                user: '<'
            },
            controller: 'UserHistoryController',
            controllerAs: 'self'
        })
        .controller('UserHistoryController', UserHistoryController)

})();