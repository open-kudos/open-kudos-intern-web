(function () {
    angular
        .module('myApp.settings', [])
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['User', '$timeout', 'User'];
    
    function SettingsController(User, $timeout, User) {
        var vm = this;

        vm.subscribed = false;
        vm.showLoader = true;

        vm.subscription = subscription;

        activate();

        function activate() {

            // Give small amount of time for Resources to load
            $timeout(function() {
                vm.subscribed = User.getCurrentUser();

                if (typeof vm.subscribed == "undefined") {
                    User.home().then(function (val) {
                        vm.subscribed = val.subscribing;
                    });
                } else vm.subscribed = vm.subscribed.subscribing;

                vm.showLoader = false;
            }, 200);
        }

        function subscription() {
            switch (vm.subscribed){
                case true:
                    User.subscribe().then(function (val) {
                        Resources.getCurrentUser().subscribed = val;
                    });
                    break;
                case false:
                    User.unsubscribe().then(function (val) {
                        Resources.getCurrentUser().subscribed = val;
                    });
                    break;
            }
        }
    }
    
})();