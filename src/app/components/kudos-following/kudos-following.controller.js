(function () {

    FollowingController.$inject = ['$window', 'ProfileService'];

    angular
        .module('myApp.components.following', [])
        .controller('FollowingController', FollowingController);

    function FollowingController($window, ProfileService) {
        var vm = this;

        vm.$onInit = onInit();

        function onInit() {
            isLoggedIn();
        }

        function isLoggedIn() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/following" : $window.location.href = "#/login";
            });
        }
    }
})();