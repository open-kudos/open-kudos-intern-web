(function () {
    var UserHistoryController = function(Resources){
        var self = this;

        self.associatedEmail = '';
        self.historyRadioBox = 'wonLost';
        self.receivedOperations = false;
        self.allOperations = true;
        self.gaveOperations = false;
        self.challengeOperations = false;
        self.autocompleteHide = true;

        self.acornPlural = acornPlural;
        self.changeRadioValue = changeRadioValue;
        self.changeView = changeView;
        self.selectAutoText = selectAutoText;
        self.checkUserList = checkUserList;

        this.$onInit = function() {
            self.currentUser = this.user;
            self.modalIndex = split(this.user.$$hashKey, ":")[1];
        };

        function changeRadioValue(value) {
            if (self.historyRadioBox != value) {
                self.historyRadioBox = value;
                console.log(self.historyRadioBox);
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

    UserHistoryController.$inject = ['Resources'];

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