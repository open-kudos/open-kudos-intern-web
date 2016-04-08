/**
 * Created by vytautassugintas on 06/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("LoginService", LoginService);

LoginService.$inject = [
    "Auth",
    "$q",
    "$http",
    "$window",
    "SERVER"
];

function LoginService(authBackend, q, http, window, SERVER) {
    var service = {
        login: LoginUser,
        checkUser: CheckUser
    };
    return service;

    function LoginUser(loginInfo) {
        var deferred = q.defer();

        authBackend.login(loginInfo).then(function (response) {
            changeViewToProfile();
            deferred.resolve(response);
        }).catch(function (error) {
            changeViewToLogin();
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function CheckUser() {
        http({
            method: 'GET',
            url: SERVER.ip,
            withCredentials: true
        }).then(function successCallback(response) {
            console.log("Logged in: " + response.data.logged);  // TODO TEST PURPOSE, REMOVE LATER
            if (response.data.logged) {
                changeViewToProfile()
            } else {
                changeViewToLogin()
            }
        }, function errorCallback(response) {
            changeViewToLogin()
        });
    }

    function changeViewToLogin(){
        window.location.href = "#/login";
    }

    function changeViewToProfile(){
        window.location.href = "#/profile";
    }

}