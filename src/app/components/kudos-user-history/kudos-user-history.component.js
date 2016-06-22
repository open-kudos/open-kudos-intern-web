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
        self.transactionIndex = 5;

        self.acornPlural = acornPlural;
        self.changeRadioValue = changeRadioValue;
        self.changeView = changeView;
        self.selectAutoText = selectAutoText;
        self.checkUserList = checkUserList;
        self.updateList = updateList;

        this.$onInit = function() {
            self.currentUser = this.user;
            self.modalIndex = split(this.user.$$hashKey, ":")[1];
        };

        function updateList(email){
            var requestData = {
                email: email,
                start: self.transactionIndex - 5,
                end: self.transactionIndex
            };

            UserHistoryService.getAllTransactions(requestData).then(function (val) {
                self.transactionHistor = val;
                self.thisUsersEmail = email;
                console.log(val);
                self.showHistoryLoader = false;
            });
        }

        function changeRadioValue(value) {
            if (self.historyRadioBox != value) {
                self.historyRadioBox = value;
            }
        }

        function selectAutoText(text) {
            self.associatedEmail = text;
            self.searchTermSelected = false;
            self.autocompleteHide = true;
            self.text = text;
        }
        
        function checkUserList() {
            self.usersCollection = Resources.getUsersCollection();
            if (self.searchTermSelected == false) {
                if (self.associatedEmail != undefined) {
                    if (self.text != self.associatedEmail)
                        (self.associatedEmail.length > 1) ? self.autocompleteHide = false : self.autocompleteHide = true;
                }
            } else {
                self.searchTermSelected = false;
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