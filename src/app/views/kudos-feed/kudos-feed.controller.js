(function () {
    angular
        .module('myApp.components.feed', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('FeedController', FeedController);

    FeedController.$inject = [];

    function FeedController() {
        activate();

        function activate(){

        }

    }
})();