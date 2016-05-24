(function () {
    "use strict";
    angular.module("myApp.components.me")
        .factory("MeService", MeService);

    MeService.$inject = [
        "User"
    ];

    function MeService() {
        var service = {

        };
        return service;
    }
})();