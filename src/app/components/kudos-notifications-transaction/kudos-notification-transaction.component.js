(function () {

    var NotificationsController = function ($scope, $cookies, $httpParamSerializer, $location, Resources, KudosNotificationService) {
        $scope.newTransactionCollection = [];
        $scope.notificationBadgeAmount = 0;
        $scope.receivedNewTransaction = false;
        $scope.notificationsToggle = false;

        $scope.acornPlural = acornPlural;
        $scope.clearNotifications = clearNotifications;

        var requestData = $httpParamSerializer({
            timestamp: $cookies.get('last_transaction')
        });

        var lastTransactionTimestamp;

        checkNotifications();

        function checkNotifications() {
            if ($cookies.get('last_transaction') != null) {
                KudosNotificationService.getNewTransactions(requestData).then(function (val) {
                    if (val.length != 0) {
                        Resources.setNotificationsTransactionCollection(val);
                        $scope.newTransactionCollection = val;
                        $scope.notificationBadgeAmount = val.length;
                        $scope.receivedNewTransaction = true;
                        lastTransactionTimestamp = val[0].timestamp;
                    }
                });
            }
        }

        function clearNotifications() {
            $scope.notificationsToggle == true ? $scope.notificationsToggle = false : $scope.notificationsToggle = true;
            $location.path("/notifications");
            if ($cookies.get('last_transaction') != null) {
                if ($scope.newTransactionCollection.length != 0) {
                    overwriteLastTransactionTimestamp($scope.newTransactionCollection[0].timestamp);
                    $scope.notificationBadgeAmount = 0;
                    $scope.receivedNewTransaction = false;
                }
            }
        }

        function overwriteLastTransactionTimestamp(timestamp) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
            $cookies.put('last_transaction', timestamp, {expires: expireDate});
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    NotificationsController.$inject = ['$scope', '$cookies', '$httpParamSerializer', '$location', 'Resources', 'KudosNotificationService'];

    angular.module('myApp.components.notifications', [])
        .component('kudosNotificationsTransactions', {
            templateUrl: 'app/components/kudos-notifications-transaction/kudos-notifications-transaction.html',
            controller: 'NotificationsController'
        })
        .controller('NotificationsController', NotificationsController);
})();