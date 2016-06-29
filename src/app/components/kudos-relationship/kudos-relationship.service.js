(function () {
    "use strict";
    angular.module("myApp.components.relationship")
        .factory("RelationService", RelationService);

    RelationService.$inject = [
        "Relation"
    ];

    function RelationService(Relation) {

        var followingCollection = [];
        var followersCollection = [];

        var service = {
            getFollowing: getFollowing,
            getFollowers: getFollowers,
            addFollower: addFollower,
            removeFollowing: removeFollowing,
            getFollowingCollection: getFollowingCollection,
            getFollowersCollection: getFollowersCollection
        };
        return service;

        function getFollowing() {
            return Relation.followed().then(function (val) {
                followingCollection = val.data;
                return val;
            })
        }

        function getFollowers() {
            return Relation.followers().then(function (val){
                followersCollection = val.data;
                return val;
            })
        }

        function addFollower(email) {
            return Relation.add(email).then(function (val) {
                return val;
            })
        }

        function removeFollowing(email) {
            return Relation.remove(email).then(function (val) {
                return val;
            })
        }

        function getFollowingCollection() {
            return followingCollection;
        }

        function getFollowersCollection() {
            return followersCollection;
        }

    }
})();