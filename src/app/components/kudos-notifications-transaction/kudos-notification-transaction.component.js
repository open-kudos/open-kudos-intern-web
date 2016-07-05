(function () {

    NotificationsController.$inject = ['$location', 'Resources', 'KudosNotificationService'];

    angular.module('myApp.components.notifications', [])
        .component('kudosNotificationsTransactions', {
            templateUrl: 'app/components/kudos-notifications-transaction/kudos-notifications-transaction.html',
            controller: ('NotificationsController', NotificationsController),
            controllerAs: 'notification'
        }) // TODO REFACTOR controller IN THE FUTURE
        .controller('NotificationsController', NotificationsController);

    function NotificationsController($location, Resources, KudosNotificationService) {
        var vm = this;

        vm.newTransactionCollection = [];
        vm.notificationBadgeAmount = 0;
        vm.receivedNewTransaction = false;
        vm.notificationsToggle = false;

        vm.clearNotifications = clearNotifications;
        vm.checkNotifications = checkNotifications;

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