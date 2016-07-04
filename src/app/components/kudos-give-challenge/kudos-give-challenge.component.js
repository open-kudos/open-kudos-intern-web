(function () {
    angular
        .module('myApp.components.giveChallenge', [])
        .component('kudosGiveChallenge', {
            templateUrl: 'app/components/kudos-give-challenge/kudos-give-challenge.html',
            controllerAs: "giveChallenge",
            controller: ("GiveChallengeController", GiveChallengeController)
        });

    GiveChallengeController.$inject = ['$httpParamSerializer', 'Resources', 'GiveChallengeService', '$filter'];

    function GiveChallengeController($httpParamSerializer, Resources, GiveChallengeService, $filter){
        var vm = this;
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';

        vm.userAvailableKudos = 0;
        vm.autocompleteHide = true;
        vm.showError = false;
        vm.usersCollection = [];

        vm.lengthLimit = lengthLimit;
        vm.clearChallengeFormValues = clearChallengeFormValues;
        vm.challengeFormCheck = challengeFormCheck;
        vm.giveChallenge = giveChallenge;
        vm.showChallengeFormErrorMessage = showChallengeFormErrorMessage;
        vm.giveToInputChanged = giveToInputChanged;
        vm.selectAutoText = selectAutoText;
        
        if(isEmptyCollection(Resources.getUsersCollection())){
            GiveChallengeService.listUsers().then(function (val) {
                Resources.setUsersCollection(val.userList);
                vm.usersCollection = Resources.getUsersCollection();
            });
        } else {
            vm.usersCollection = Resources.getUsersCollection();
        }

        function giveChallenge() {
            var expirationDate = $filter('date')(vm.giveChallengeExpirationDate, requestDateFormat);
            var currentDate = $filter('date')(new Date(), requestDateFormat);
            vm.userEmail = Resources.getCurrentUserEmail();

            var giveTo = $httpParamSerializer({
                participant: vm.giveChallengeTo,
                name: vm.giveChallengeName,
                description: vm.giveChallengeDescription,
                finishDate: expirationDate,
                amount: vm.giveChallengeAmountOfKudos
            });

            var challengeCall = challengeFormCheck(expirationDate, currentDate);

            if (challengeCall)
                GiveChallengeService.createChallenge(giveTo).then(function (val) {
                    clearChallengeFormValues();
                    $('#giveChallengeModal').modal('hide');
                    toastr.success('You successfully challenged ' + val.data.participant + " with " + acornPlural(val.data.amount) + '.');
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getNewChallenges().push(val.data);
                }).catch(function () {
                    showChallengeFormErrorMessage("Challenge receiver does not exist");
                })
        }

        function challengeFormCheck(expirationDate, currentDate) {
            if (vm.giveChallengeName == null) {
                showChallengeFormErrorMessage("Please enter Challenge name");
                return false;
            } else if (vm.giveChallengeAmountOfKudos == null) {
                showChallengeFormErrorMessage("Please enter valid challenge Acorns");
                return false;
            } else if (vm.giveChallengeAmountOfKudos > vm.userAvailableKudos) {
                showChallengeFormErrorMessage("You don't have enough of Acorns");
                return false;
            } else if (vm.giveChallengeTo == null) {
                showChallengeFormErrorMessage("Please enter challenge receiver");
                return false;
            } else if (vm.giveChallengeTo == vm.userEmail) {
                showChallengeFormErrorMessage("You can't challenge yourself");
                return false;
            } else if (expirationDate <= currentDate){
                showChallengeFormErrorMessage("You can not choose date in the past");
                return false;
            }
            showChallengeFormErrorMessage("");
            vm.showError = false;
            return true;
        }

        function clearChallengeFormValues() {
            vm.giveChallengeTo = null;
            vm.giveChallengeReferee = null;
            vm.giveChallengeName = null;
            vm.giveChallengeDescription = null;
            vm.giveChallengeExpirationDate = null;
            vm.giveChallengeAmountOfKudos = null;
            vm.autocompleteHide = true;
            vm.showError = false;
            vm.challengeFormErrorMessage = "";
            vm.userAvailableKudos = Resources.getUserAvailableKudos();
        }

        function showChallengeFormErrorMessage(message) {
            vm.showError = true;
            vm.challengeFormErrorMessage = message;
        }

        function selectAutoText(text) {
            vm.giveChallengeTo = text;
            vm.autocompleteHide = true;
            vm.text = text;
        }

        function giveToInputChanged() {
            if (vm.giveChallengeTo != undefined)
                vm.autocompleteHide = vm.giveChallengeTo.length <= 1;
        }
    }
})();