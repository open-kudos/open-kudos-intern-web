/**
 * Created by vytautassugintas on 25/05/16.
 */
(function () {
    "use strict";
    angular.module("myApp.components.relationship")
        .factory("RelationService", RelationService);

    RelationService.$inject = [
        "Relation"
    ];

    function RelationService(Relation) {
        var service = {
            followed: getFollowed
        };
        return service;

        function getFollowed() {
            return Relation.followed().then(function (val) {
                console.log(val);
                return val;
            })
        }
    }
})();