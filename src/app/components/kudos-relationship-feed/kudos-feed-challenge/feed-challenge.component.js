(function () {
    angular
        .module('myApp.components.feed.challenge', [])
        .component('kudosFeedChallenge', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-challenge/feed-challenge.html',
            bindings: {
                action: '=',
                index: '='
            },
            controller: ('ChallengeFeedController', ChallengeFeedController),
            controllerAs: 'challenge'
        });

    ChallengeFeedController.$inject = ['Utils'];

    function ChallengeFeedController(Utils) {
        var vm = this;
        vm.loadComments = false;

        vm.formatDate = Utils.formatDate;
        vm.acornPlural = Utils.acornPlural;

        vm.$onInit = onInit();

        function onInit() {

        }

    }
})();