(function () {
    FeedController.$inject = ['$window', 'ProfileService'];

    angular
        .module('myApp.components.feed', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('FeedController', FeedController);

    function FeedController($window, ProfileService) {
        activate();

        function activate(){
            isLoggedIn();
        }

        function isLoggedIn() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/feed";
            });
        }
    }
})();