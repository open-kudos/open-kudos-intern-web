(function () {
    "use strict";
    angular.module("myApp")
        .factory("Relation", Relation);

    Relation.$inject = [
        "$http",
        "SERVER"
    ];

    function Relation($http, SERVER) {
        var relation = {
            followById: followById,
            followByEmail: followByEmail,
            unfollow: unfollow,
            getFollowers: getFollowers,
            getFollowing: getFollowing,
            getActionsFeed: getActionsFeed
        };
        return relation;

        function followById(requestData) {
            return $http({
                method: 'POST',
                data: requestData,
                url: SERVER.ip + "/relation/follow",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function followByEmail(requestParams) {
            return $http({
                method: 'POST',
                params: requestParams,
                url: SERVER.ip + "/relation/follow",
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function unfollow(userId) {
            return $http({
                method: 'POST',
                url: SERVER.ip + "/relation/unfollow/" + userId,
                withCredentials: true
            }).then(function (response) {
                return response;
            });
        }

        function getFollowers(pageParams) {
            return $http({
                method: 'GET',
                params: pageParams,
                url: SERVER.ip + "/relation/followers",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getFollowing(pageParams) {
            return $http({
                method: 'GET',
                params: pageParams,
                url: SERVER.ip + "/relation/following",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getActionsFeed(pageParams) {
            return $http({
                method: 'GET',
                params: pageParams,
                url: SERVER.ip + "/relation/feed",
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

    }
})();
