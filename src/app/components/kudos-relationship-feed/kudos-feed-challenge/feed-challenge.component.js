(function () {
    angular
        .module('myApp.components.feed.challenge', [])
        .component('kudosFeedChallenge', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-challenge/feed-challenge.html',
            bindings: {
                action: '='
            },
            controller: ('ChallengeFeedController', ChallengeFeedController),
            controllerAs: 'challenge'
        });

    ChallengeFeedController.$inject = ['Utils'];

    function ChallengeFeedController(Utils) {
        var vm = this;

        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {

        }
    }
})();