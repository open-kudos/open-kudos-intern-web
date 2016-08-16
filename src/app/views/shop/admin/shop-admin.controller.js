(function () {

    angular
        .module('myApp.admin.shop', [])
        .controller('AdminShopController', AdminShopController);

    AdminShopController.$inject = ['Shop', 'Utils'];

    function AdminShopController(Shop, Utils) {
        var vm = this;

        function activate() {

        }

        activate();

    }

})();