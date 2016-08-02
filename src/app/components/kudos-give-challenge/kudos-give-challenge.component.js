(function () {
    angular
        .module('myApp.components.giveChallenge', [])
        .component('kudosGiveChallenge', {
            templateUrl: 'app/components/kudos-give-challenge/kudos-give-challenge.html',
            controllerAs: "giveChallenge",
            controller: ("GiveChallengeController", GiveChallengeController)
        });

    GiveChallengeController.$inject = ['Resources', 'GiveChallengeService', '$filter', 'Utils', 'Challenges'];

    function GiveChallengeController(Resources, GiveChallengeService, $filter, Utils, ChallengeService){
        var vm = this;
        var requestDateFormat = 'yyyy-MM-dd';

        vm.userAvailableKudos = 0;
        vm.autocompleteHide = true;
        vm.showError = false;
        vm.usersCollection = [];

        vm.lengthLimit = Utils.lengthLimit;
        vm.clearChallengeFormValues = clearChallengeFormValues;
        vm.challengeFormCheck = challengeFormCheck;
        vm.giveChallenge = giveChallenge;
        vm.showChallengeFormErrorMessage = showChallengeFormErrorMessage;
        vm.giveToInputChanged = giveToInputChanged;
        vm.selectAutoText = selectAutoText;

        vm.$onInit = onInit();

        function onInit() {
            
        }

        function giveChallenge() {
            var expirationDate = $filter('date')(vm.giveChallengeExpirationDate, requestDateFormat);
            var currentDate = $filter('date')(new Date(), requestDateFormat);
            console.log(expirationDate);
            vm.userEmail = Resources.getCurrentUserEmail();

            var giveTo = {
                receiverEmail: vm.giveChallengeTo,
                name: vm.giveChallengeName,
                description: vm.giveChallengeDescription,
                expirationDate: expirationDate,
                amount: vm.giveChallengeAmountOfKudos
            };

            var challengeCall = challengeFormCheck(expirationDate, currentDate);

            if (challengeCall)
                ChallengeService.giveChallenge(giveTo).then(function (val) {
                    console.log(val);
                    clearChallengeFormValues();
                    $('#giveChallengeModal').modal('hide');
                    toastr.success('You successfully challenged ' + val.data.participantFullName + " with " + Utils.acornPlural(val.data.amount) + '.');
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getNewChallenges().unshift(val.data);
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