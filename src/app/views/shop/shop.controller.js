(function () {

    angular
        .module('myApp.shop', [])
        .controller('ShopController', ShopController);

    ShopController.$inject = ['Shop', 'Utils'];

    function ShopController(Shop, Utils) {
        var vm = this;
        var pageResponse = {first: false, last: false};
        var pageParams = {page: 0, size: 10};

        vm.shopItemsCollection = [];
        vm.showMoreButton = false;
        vm.showLessButton = false;

        vm.acornPlural = Utils.acornPlural;
        vm.buyItem = buyItem;
        vm.loadShopItems = loadShopItems;

        vm.loadPreviousPage = loadPreviousPage(pageResponse, pageParams, loadShopItems);
        vm.loadNextPage = loadNextPage(pageResponse, pageParams, loadShopItems);

        activate();

        function activate() {
            mockShopItems();
        }

        function buyItem(){
            Shop.buyItem().then(function (response) {
                if(response.status == 200){
                    //TODO subtract item price from user acorns
                }
            })
        }
        
        function loadShopItems(pageParams) {
            Shop.getItems(pageParams).then(function (response) {
                pageResponse = response;
                // vm.shopItemsCollection = response.content;
                whichPaginationButtonToShow(response, vm.showMoreButton, vm.showLessButton);
            })
        }

        function loadPreviousPage(pageResponse, pageParams, requestToLoad) {
            loadFirstPageIfCurrentIsEmpty(pageResponse, pageParams, requestToLoad);
            if (pageResponse != undefined && !pageResponse.first) pageParams.page--;
            requestToLoad(pageParams);
        }

        function loadNextPage(pageResponse, pageParams, requestToLoad) {
            loadFirstPageIfCurrentIsEmpty(pageResponse, pageParams, requestToLoad);
            if (pageResponse != undefined && !pageResponse.first) pageParams.page++;
            requestToLoad(pageParams);
        }

        function whichPaginationButtonToShow(pageResponse, showMoreButton, showPreviousButton) {
            showMoreButton = !pageResponse.last;
            showPreviousButton = !pageResponse.first;
        }

        function loadFirstPageIfCurrentIsEmpty(pageResponse, pageParams, requestToLoad) {
            if (pageResponse.last && !pageResponse.first && pageResponse.numberOfElements == 0){
                pageParams.page = 0;
                requestToLoad(pageParams);
            }
        }

        function checkPages() {

        }
        
        function validatePurchase() {
            
        }

        function sortByPrice() {
            
        }


        
        function mockShopItems() {
            var pictures = ["https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1423124877_359.png",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1464780077_446.png",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1350395500_357.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424953806_411.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424954103_410.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424953785_418.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424954084_413.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424954269_423.jpg",
                "https://jaunimas.swedbank.lt/uploads/prizes/thumbs/1424954297_428.jpg",
                "http://mokykla.graziskiai.lt/temp/pics/konkursai/swedbank.JPG"];

            for(var i =0; i < 10; i++) {
                var randomNum = 100 * Math.floor(Math.random() * 15);
                vm.shopItemsCollection.push({
                    id: i,
                    name : "Item Name",
                    price : randomNum == 0 ? 100 * Math.floor(Math.random() * 15) : randomNum  ,
                    description : "Item Description",
                    amount : "12",
                    pictureUrl : pictures[i]
                })
            }
        }

    }

})();