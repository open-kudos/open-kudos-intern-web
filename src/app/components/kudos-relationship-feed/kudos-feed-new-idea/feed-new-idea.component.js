(function () {
    angular
        .module('myApp.components.feed.idea', [])
        .component('kudosFeedNewIdea', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-new-idea/feed-new-idea.html',
            bindings: {
                action: '='
            },
            controller: ('NewIdeaFeedController', NewIdeaFeedController),
            controllerAs: 'feed'
        });

    NewIdeaFeedController.$inject = ['Utils'];

    function NewIdeaFeedController(Utils) {
        var vm = this;

        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {

        }
    }
})();