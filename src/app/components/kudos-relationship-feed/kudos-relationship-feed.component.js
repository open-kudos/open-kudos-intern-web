(function () {
    angular
        .module('myApp.components.relationship.feed', [])
        .component('kudosRelationshipFeed', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-relationship-feed.html',
            controller: ('RelationshipFeedController', RelationshipFeedController),
            controllerAs: 'feedCtrl'
        });

    RelationshipFeedController.$inject = ['User', 'Relation', 'Utils'];

    function RelationshipFeedController(User, Relation, Utils) {
        var vm = this;

        vm.defaultPageParams = {page: 0, size: 3};
        vm.feedCollection = [];

        vm.loadActionsFeed = loadActionsFeed;
        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {
            loadActionsFeed(vm.defaultPageParams);
        }

        function loadActionsFeed(pageParams) {
            vm.loading = true;
            Relation.getActionsFeed(pageParams).then(function (feedPageResponse) {
                vm.feedCollection = feedPageResponse.content;
                vm.loading = false;
            })
        }

    }
})();