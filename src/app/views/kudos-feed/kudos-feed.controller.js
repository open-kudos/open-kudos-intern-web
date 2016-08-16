(function () {
    angular
        .module('myApp.components.feed', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('FeedController', FeedController);

    FeedController.$inject = ['User', 'Relation'];

    function FeedController(User, Relation) {

        var vm = this;

        vm.defaultPageParams = {page: 0, size: 100};
        vm.feedCollection = [];

        vm.formatDate = formatDate;

        activate();

        function activate(){
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