(function () {
    angular
        .module('myApp.components.feed.transaction', [])
        .component('kudosFeedTransaction', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-transaction/feed-transaction.html',
            bindings: {
                action: '='
            },
            controller: ('TransactionFeedController', TransactionFeedController),
            controllerAs: 'feed'
        });

    TransactionFeedController.$inject = ['Utils'];

    function TransactionFeedController(Utils) {
        var vm = this;

        vm.acornPlural = Utils.acornPlural;
        vm.formatDate = Utils.formatDate;

        vm.$onInit = onInit();

        function onInit() {

        }
    }
})();