(function () {
    angular
        .module('myApp.components.notifications', [])
        .controller('NotificationsController', NotificationsController);

    NotificationsController.$inject = ['$location', 'Resources', 'KudosNotificationService', 'Utils'];

    function NotificationsController($location, Resources, KudosNotificationService, Utils) {
        var vm = this;

        vm.newTransactionCollection = [];
        vm.notificationBadgeAmount = 0;
        vm.receivedNewTransaction = false;
        vm.notificationsToggle = false;

        vm.clearNotifications = clearNotifications;
        vm.checkNotifications = checkNotifications;
        vm.acornPlural = Utils.acornPlural;

        var lastTransactionTimestamp;

        checkNotifications();

        function checkNotifications() {
            KudosNotificationService.getNewTransactions().then(function (val) {
                if (val.length != 0) {
                    Resources.setNotificationsTransactionCollection(val);
                    vm.newTransactionCollection = val;
                    vm.notificationBadgeAmount = val.length;
                    vm.receivedNewTransaction = true;
                    lastTransactionTimestamp = val[0].timestamp;
                }
            });
        }

        function clearNotifications() {
            vm.notificationsToggle == true ? vm.notificationsToggle = false : vm.notificationsToggle = true;
            $location.path("/notifications");
            if (vm.newTransactionCollection.length != 0) {
                overwriteLastTransactionTimestamp(vm.newTransactionCollection[0].timestamp);
                vm.notificationBadgeAmount = 0;
                vm.receivedNewTransaction = false;
            }
        }

        function overwriteLastTransactionTimestamp(timestamp) {
            KudosNotificationService.setLastTransaction(timestamp);
        }
    }
})();