(function () {
    var UserHistoryController = function(Resources, UserHistoryService){
        var self = this;

        self.showHistoryLoader = true;
        self.associatedEmail = '';
        self.historyRadioBox = 'wonLost';
        self.receivedOperations = false;
        self.allOperations = true;
        self.gaveOperations = false;
        self.challengeOperations = false;
        self.autocompleteHide = true;
        self.transactionEndingIndex = 4;
        self.transactionStartingIndex = 0;
        self.showMoreButton = false;

        self.split = split;
        self.acornPlural = acornPlural;
        self.changeRadioValue = changeRadioValue;
        self.changeView = changeView;
        self.updateListAll = updateListAll;
        self.checkButtons = checkButtons;

        this.$onInit = function() {
            self.currentUser = this.user;
            self.modalIndex = split(this.user.$$hashKey, ":")[1];
        };

        function updateListAll(email){
            self.thisUsersEmail= email;
            var requestData = {
                email: self.thisUsersEmail,
                start: self.transactionStartingIndex,
                end: self.transactionEndingIndex
            };

            if (!UserHistoryService.checkAll(requestData)) {
                UserHistoryService.getAllTransactions(requestData).then(function (val) {
                    self.transactionHistory = val;
                    console.log(val);
                    checkButtons();
                    UserHistoryService.setAll(self.thisUsersEmail, val);
                    self.showHistoryLoader = false;
                });
            } else self.transactionHistory = UserHistoryService.checkAll(requestData);
        }
        
        function checkButtons() {
            if (self.transactionHistory[self.transactionEndingIndex + 1]){
                self.showMoreButton = true;
            }
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
            self.associatedEmail = '';
            self.historyRadioBox = 'wonLost';
        }
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