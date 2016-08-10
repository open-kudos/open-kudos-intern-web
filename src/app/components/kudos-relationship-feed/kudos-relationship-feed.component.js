(function () {
    angular
        .module('myApp.components.relationship.feed', [])
        .component('kudosRelationshipFeed', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-relationship-feed.html',
            controller: ('RelationshipFeedController', RelationshipFeedController),
            controllerAs: 'feedCtrl'
        });

    RelationshipFeedController.$inject = ['User', 'Relation'];

    function RelationshipFeedController(User, Relation) {
        var vm = this;

        vm.defaultPageParams = {page: 0, size: 3};
        vm.feedCollection = [];

        vm.loadActionsFeed = loadActionsFeed;
        vm.formatDate = formatDate;

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

        function formatDate(commentDate) {
            var date = new Date(commentDate);
            return date.getFullYear() + "-" + formatDateNumber(date.getMonth()) + "-" + formatDateNumber(date.getDay())+ "-" + date.getHours() + ":" + date.getMinutes();
        }

        function formatDateNumber(number) {
            return number < 10 ? '0' + number : number;
        }
    }
})();