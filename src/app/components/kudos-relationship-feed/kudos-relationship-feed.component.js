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

        vm.formatDate = formatDate;

        vm.$onInit = onInit();

        function onInit() {
            Relation.getActionsFeed(vm.defaultPageParams).then(function (feedPageResponse) {
                vm.feedCollection = feedPageResponse.content;
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