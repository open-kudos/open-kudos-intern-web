/**
 * Created by vytautassugintas on 06/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("Auth", Auth);

Auth.$inject = [
    "$http",
    "SERVER"
];

function Auth($http, SERVER) {
    var service = {
        login: Login,
        logout: Logout,
        register: Register,
        reset: ResetPassword,
        confirm: ConfirmRegistration
    }
    return service;

    function Login(data) {
        return $http({
            method: 'POST',
            url: SERVER.ip + "/login?" + data,
            withCredentials: true
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function Logout() {
        return $http.get(SERVER.ip + "/logout").then(function(response) {
            return response.data;
        });
    }

    function Register(requestData) {
        if(requestData.password === requestData.confirmPassword) {
            return $http.post(SERVER.ip + "/register", requestData).then(function(response) {
                return response.data;
            });
        } else {
            var error = {
                message: "NO_MATCH_PASSWORD"
            }
            return error;
        }
    }

    function ResetPassword(requestData) {
        return $http.post(SERVER.ip + "/reset", requestData).then(function(response) {
            return response.data;
        });
    }

    function ConfirmRegistration(requestData) {
        return  $http.post(SERVER.ip + "/confirm", requestData).then(function(response) {
            return response.data;
        });
    }
}