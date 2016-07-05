(function () {
    CompletedChallengesController.$inject = ['Challenges', 'Resources', 'ProfileService'];

    angular
        .module('myApp.components.completedChallenges', [])
        .component('kudosChallengeCompleted', {
            templateUrl: 'app/components/kudos-challenge-completed/kudos-challenge-completed.html',
            controller: ('CompletedChallengesController',CompletedChallengesController),
            controllerAs: 'chCompleted'
        });

    function CompletedChallengesController(Challenges, Resources, ProfileService) {
        var vm = this,
            showMoreLimit = 5;

        vm.completedChallengesLimit = 5;
        vm.completedChallengesCollection = [];
        vm.showList = false;

        vm.checkList = checkList;
        vm.acornPlural = acornPlural;
        vm.getWinner = getWinner;
        vm.showMore = showMore;
        vm.showLess = showLess;
        vm.showMoreButton = showMoreButton;

        vm.$onInit = onInit();

        function onInit() {
            Challenges.getCompletedChallenges().then(function (val) {
                Resources.setCompletedChallenges(val);
                vm.completedChallengesCollection = Resources.getCompletedChallenges();
                showMoreButton(val);
                checkList();
            });

            if(!Resources.getCurrentUserEmail()){
                ProfileService.userHome().then(function (val) {
                    Resources.setCurrentUserEmail(val.email);
                    vm.userEmail = Resources.getCurrentUserEmail();
                });
            } else {
                vm.userEmail = Resources.getCurrentUserEmail();
            }
        }

        function checkList() {
            vm.showList = vm.completedChallengesCollection.length > 0;
        }

        function getWinner(index) {
            if (Resources.getCompletedChallenges()[index].creatorStatus) {
                if (Resources.getCompletedChallenges()[index].creator == Resources.getCurrentUserEmail) return "You won the challenge!"
                else return Resources.getCompletedChallenges()[index].creator + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].creatorStatus == false){
                if (Resources.getCompletedChallenges()[index].creator == Resources.getCurrentUserEmail) return Resources.getCompletedChallenges()[index].participant + " won the challenge";
                else return "You won the challenge!"
            }

            if (Resources.getCompletedChallenges()[index].participantStatus) {
                if (Resources.getCompletedChallenges()[index].participant == Resources.getCurrentUserEmail()) return "You won the challenge!"
                else return Resources.getCompletedChallenges()[index].participant + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].participantStatus == false){
                if (Resources.getCompletedChallenges()[index].participant == Resources.getCurrentUserEmail()) return Resources.getCompletedChallenges()[index].creator + " won the challenge";
                else return "You won the challenge!"
            }
        }

        function showMoreButton(val) {
            vm.showMoreButton = val.length > vm.completedChallengesLimit
        }

        function showMore() {
            vm.completedChallengesLimit += showMoreLimit;
            showMoreButton(Resources.getCompletedChallenges());
        }

        function showLess() {
            vm.completedChallengesLimit = showMoreLimit;
            showMoreButton(Resources.getCompletedChallenges());
            vm.showLessButton = false;
        }
    }
})();