(function() {
    "use strict";
    angular.module("myApp")
        .factory("Relation", Relation);

    Relation.$inject = [
        "$http",
        "SERVER"
    ];

    function Relation($http, SERVER) {
        var relations = {
            followers: followers,
            followed: followed,
            add: add,
            remove: remove,
            feed: feed
        }
        return relations;

        function followers() {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/relations/followers",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }
        
        function followed() {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/relations/followed",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }
        
        function add(requestData) {
            return $http({
                method: 'POST',
                url: SERVER.ip + "/relations/add?" + requestData,
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function remove(requestData) {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/relations/remove?" + requestData,
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function feed(requestData) {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/relations/feed?" + requestData,
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

    }
})();
