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
        check: CheckUser,
        register: Register,
        reset: ResetPassword,
        confirm: ConfirmRegistration
    };
    return service;

    function Login(data) {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/login?" + data
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function Logout() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url : SERVER.ip + "/logout"
        }).then(function(response) {
            return response.data;
        });
    }

    function CheckUser() {
        return $http({
            method: 'GET',
            url: SERVER.ip,
            withCredentials: true
        }).then(function successCallback(response) {
            return response;
        }, function errorCallback(error) {
            return error;
        });
    }

    function Register(requestData) {
        if(requestData.password === requestData.confirmPassword) {
            return $http({
                    method: 'POST',
                    withCredentials: true,
                    url: SERVER.ip + "/register?" + requestData}).then(function(response) {
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

    function ConfirmRegistration(id) {
        return  $http({
            withCredentials: true,
            method: 'POST',
            url: SERVER.ip + "/confirm?id=" + id}).then(function(response) {
            return response.data;
        });
    }


}