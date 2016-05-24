(function () {
    "use strict";
    angular.module("myApp.components.me")
        .factory("MeService", MeService);

    MeService.$inject = [
        "User"
    ];

    function MeService(User) {
        var service = {
            edit: update
        };
        return service;

        function update(requestData) {
            return User.update(requestData).then(function (val) {
                return val;
            })
        }
    }
})();