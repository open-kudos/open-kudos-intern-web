(function () {
    "use strict";
    angular.module("myApp.components.me")
        .factory("MeService", MeService);

    MeService.$inject = [
        "User",
        "Relation"
    ];

    function MeService(User, Relation) {
        var service = {
            edit: update,
            followers: getFollowers,
            following: getFollowing
        };
        return service;

        function update(requestData) {
            return User.update(requestData).then(function (val) {
                return val;
            })
        }

        function getFollowers() {
            return Relation.followers().then(function (val) {
                return val
            })
        }

        function getFollowing() {
            return Relation.followed().then(function (val) {
                return val
            })
        }
    }
})();