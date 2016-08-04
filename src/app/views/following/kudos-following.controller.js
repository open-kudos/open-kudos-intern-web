(function () {
    angular
        .module('myApp.components.following', [])
        .controller('FollowingController', FollowingController);

    FollowingController.$inject = [];

    function FollowingController() {
        var vm = this;

        vm.$onInit = onInit();

        function onInit() {
            
        }

    }
})();