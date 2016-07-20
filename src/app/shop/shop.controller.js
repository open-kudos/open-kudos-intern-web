(function () {

    angular
        .module('myApp.shop', [])
        .controller('ShopController', ShopController);

    ShopController.$inject = ['Resources'];

    function ShopController(Resources) {
        var vm = this;
        
        vm.shopItemsCollection = [];
        
        activate();

        function activate() {
            for(var i =0; i < 10; i++) {
                vm.shopItemsCollection.push({
                    title: "Title",
                    imageURL: "http://mokykla.graziskiai.lt/temp/pics/konkursai/swedbank.JPG",
                    quantity: 5,
                    cost: 5
                })
            }
        }

    }

})();