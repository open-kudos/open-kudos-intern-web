(function () {
    "use strict";
    angular.module("myApp")
        .factory("Shop", Shop);

    Shop.$inject = [
        "$http",
        "SERVER"
    ];

    function Shop($http, SERVER) {
        var shop = {
            getItems: getItems,
            buyItem: buyItem,
            deleteItem: deleteItem
        };
        return shop;

        function getItems(pageParams) {
            return $http({
                method: 'GET',
                params: pageParams,
                withCredentials: true,
                url: SERVER.ip + "/shop/items"
            }).then(function (response) {
                return response.data;
            })
        }

        function buyItem(itemId) {
            return $http({
                method: 'POST',
                data: requestData,
                url: SERVER.ip + "/shop/" + itemId + "/buy",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function deleteItem(itemId) {
            return $http({
                method: 'POST',
                data: requestData,
                url: SERVER.ip + "/shop/" + itemId + "/delete",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

    }
})();