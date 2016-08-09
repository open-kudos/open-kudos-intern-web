(function () {
    angular
        .module('myApp.components.feed.comment', [])
        .component('kudosFeedComment', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-comment/feed-comment.html',
            bindings: {
                action: '='
            },
            controller: ('CommentFeedController', CommentFeedController),
            controllerAs: 'feed'
        });

    CommentFeedController.$inject = ['Utils'];

    function CommentFeedController(Utils) {
        var vm = this;

        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {

        }
    }
})();