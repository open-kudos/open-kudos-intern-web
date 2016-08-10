(function () {
    angular
        .module('myApp.components.feed.comment', [])
        .component('kudosFeedComment', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-comment/feed-comment.html',
            bindings: {
                action: '=',
                index: '='
            },
            controller: ('CommentFeedController', CommentFeedController),
            controllerAs: 'feed'
        });

    CommentFeedController.$inject = ['Utils', 'Challenges', 'User'];

    function CommentFeedController(Utils, ChallengesService, User) {
        var vm = this;

        vm.formatDate = Utils.formatDate;
        vm.acornPlural = Utils.acornPlural;
        vm.loadChallenge = loadChallenge;
        vm.checkChallengeCreatorName = checkChallengeCreatorName;

        vm.$onInit = onInit();

        function onInit() {

        }

        function loadChallenge(challengeId) {
            ChallengesService.getChallenge(challengeId).then(function (chalengeResponse) {
                vm.challengeResponse = chalengeResponse;
                vm.loadComments = true;
            })
        }

        function checkChallengeCreatorName(userId, userName) {
            var currentUserId = User.getCurrentUser().id;
            return userId == currentUserId ? 'own' : userName;
        }
    }
})();