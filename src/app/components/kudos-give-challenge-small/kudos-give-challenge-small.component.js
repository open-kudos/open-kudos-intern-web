(function () {

    GiveChallengeSmallController.$inject = ['$httpParamSerializer', 'Resources', 'GiveChallengeService', '$filter', 'ProfileService'];

    angular.module('myApp.components.giveChallengeSmall', [])
        .component('kudosGiveChallengeSmall', {
            templateUrl: 'app/components/kudos-give-challenge-small/kudos-give-challenge-small.html',
            bindings: {
                email: '<',
                index: '<'
            },
            controller: ('GiveChallengeSmallController', GiveChallengeSmallController),
            controllerAs: 'chSmall'
        });

    function GiveChallengeSmallController($httpParamSerializer, Resources, GiveChallengeService, $filter, ProfileService){
        var vm = this,
            requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';

        vm.userAvailableKudos = 0;
        vm.autocompleteHide = true;
        vm.showError = false;
        vm.usersCollection = [];
        
        vm.clearChallengeFormValues = clearChallengeFormValues;
        vm.challengeFormCheck = challengeFormCheck;
        vm.giveChallenge = giveChallenge;
        vm.showChallengeFormErrorMessage = showChallengeFormErrorMessage;

        vm.$onInit = onInit();

        function onInit(){
            vm.giveChallengeTo = vm.email;
            vm.id = vm.index;

            if(!Resources.getUsersCollection()){
                GiveChallengeService.listUsers().then(function (val) {
                    Resources.setUsersCollection(val.userList);
                    vm.usersCollection = Resources.getUsersCollection();
                });
            } else vm.usersCollection = Resources.getUsersCollection();

            if (!Resources.getUserAvailableKudos()){
                ProfileService.remainingKudos().then(function (val) {
                    Resources.setUserAvailableKudos(val);
                    vm.userAvailableKudos = Resources.getUserAvailableKudos();
                });
            } else {
                vm.userAvailableKudos = Resources.getUserAvailableKudos();
            }
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
                    $('#modal'+vm.id+'challenge').modal('hide');
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    vm.userAvailableKudos = Resources.getUserAvailableKudos();
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
            vm.giveChallengeReferee = null;
            vm.giveChallengeName = null;
            vm.giveChallengeDescription = null;
            vm.giveChallengeExpirationDate = null;
            vm.giveChallengeAmountOfKudos = null;
            vm.autocompleteHide = true;
            vm.showError = false;
            vm.challengeFormErrorMessage = "";
        }

        function showChallengeFormErrorMessage(message) {
            vm.showError = true;
            vm.challengeFormErrorMessage = message;
        }
    }
})();