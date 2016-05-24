/**
 * Created by vytautassugintas on 23/05/16.
 */
"use strict";
angular.module("myApp.components.confirm-email")
    .factory("ConfirmEmailService", ConfirmEmailService);

ConfirmEmailService.$inject = [
    "Auth"
];

function ConfirmEmailService(authBackend) {
    var service = {
        confirmUser: Confirm
    };
    return service;

    function Confirm(requestData) {
        return authBackend.confirm(requestData).then(function () {
            return "Confirmed";
        }).catch(function () {
            return "Error";
        });
    }


}