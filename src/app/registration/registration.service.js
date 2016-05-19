/**
 * Created by vytautassugintas on 11/04/16.
 */
(function () {
    "use strict";
    angular.module("myApp")
        .factory("RegistrationService", RegistrationService);

    RegistrationService.$inject = [
        "Auth"
    ];

    function RegistrationService(authBackend) {
        var service = {
            register: Register,
            confirm: Confirm
        };
        return service;

        function Register(requestData) {
            return authBackend.register(requestData).then(function (val) {
                return val;
            }).catch(function () {
                return "Error";
            })
        }

        function Confirm(requestData) {
            return authBackend.confirm(requestData);
        }

    }
})();