(function () {
    angular
        .module('myApp.components.feed.relation', [])
        .component('kudosFeedNewRelation', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-new-relation/feed-new-relation.html',
            bindings: {
                action: '='
            },
            controller: ('CommentFeedController', NewRelationFeedController),
            controllerAs: 'feed'
        });

    NewRelationFeedController.$inject = ['Utils'];

    function NewRelationFeedController(Utils) {
        var vm = this;

        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {

        }
    }
})();