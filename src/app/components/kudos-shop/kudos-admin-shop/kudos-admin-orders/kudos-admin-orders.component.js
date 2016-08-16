(function () {
    angular
        .module('myApp.admin.components.orders', [])
        .component('kudosAdminOrders', {
            templateUrl: 'app/components/kudos-shop/kudos-admin-shop/kudos-admin-orders/kudos-admin-orders.html',
            controller: ('AdminOrdersController', AdminOrdersController),
            controllerAs: 'order'
        });

    AdminOrdersController.$inject = [];

    function AdminOrdersController() {
        var vm = this;

        vm.ordersCollection = [];

        vm.$onInit = onInit();

        function onInit() {
            mockOrders();
        }

        function mockOrders(){
            for (var i = 0; i < 5; i++) {
                vm.ordersCollection.push({
                    userFullName: "Name Surname",
                    userEmail: "name@surname.com",
                    orderItem: "iPad Air 2",
                    orderDate: "2020-20-20"
                });
            }
        }

    }
})();