(function () {
    CompletedChallengesController.$inject = ['Challenges', 'Resources', 'ProfileService', 'Utils'];

    angular
        .module('myApp.components.completedChallenges', [])
        .component('kudosChallengeCompleted', {
            templateUrl: 'app/components/kudos-challenge-completed/kudos-challenge-completed.html',
            controller: ('CompletedChallengesController',CompletedChallengesController),
            controllerAs: 'chCompleted'
        });

    function CompletedChallengesController(Challenges, Resources, ProfileService, Utils) {
        var vm = this,
            showMoreLimit = 5;

        vm.completedChallengesLimit = 5;
        vm.completedChallengesCollection = [];
        vm.showList = false;

        vm.acornPlural = Utils.acornPlural;
        vm.getWinner = getWinner;
        vm.showMore = showMore;
        vm.showLess = showLess;
        vm.showMoreButton = showMoreButton;

        vm.$onInit = onInit();

        function onInit() {
            Challenges.getCompletedChallenges().then(function (val) {
                Resources.setCompletedChallenges(val);
                vm.completedChallengesCollection = Resources.getCompletedChallenges();
                vm.completedChallengesCollection = sort(vm.completedChallengesCollection);
                showMoreButton(val);
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

        function getWinner(index) {
            if (Resources.getCompletedChallenges()[index].creatorStatus) {
                if (Resources.getCompletedChallenges()[index].creatorEmail == Resources.getCurrentUserEmail()) return "You won the challenge!";
                else return Resources.getCompletedChallenges()[index].creatorEmail + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].creatorStatus == false){
                if (Resources.getCompletedChallenges()[index].creatorEmail == Resources.getCurrentUserEmail()) return Resources.getCompletedChallenges()[index].participantEmail + " won the challenge";
                else return "You won the challenge!"
            } else if (Resources.getCompletedChallenges()[index].participantStatus) {
                if (Resources.getCompletedChallenges()[index].participantEmail == Resources.getCurrentUserEmail()) return "You won the challenge!";
                else return Resources.getCompletedChallenges()[index].participantEmail + " won the challenge";
            } else if (Resources.getCompletedChallenges()[index].participantStatus == false){
                if (Resources.getCompletedChallenges()[index].participantEmail == Resources.getCurrentUserEmail()) return Resources.getCompletedChallenges()[index].creatorEmail + " won the challenge";
                else return "You won the challenge!";
            }
        }

        function sort(list) {
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    for (var ii = i; ii < list.length; ii++) {
                        if (list[i].createDate < list[ii].createDate) {
                            var temp = list[i];
                            list[i] = list[ii];
                            list[ii] = temp;
                        }
                    }
                }
            }
            return list;
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