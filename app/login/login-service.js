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
    "$cookies",
    "SERVER",
    "$base64"
];

function LoginService(authBackend, q, http, window, cookies, SERVER, $base64) {
    var service = {
        login: LoginUser,
        checkUser: CheckUser,
        rememberMe: RememberMe
    };
    return service;

    function LoginUser(loginInfo) {
        var deferred = q.defer();

        authBackend.login(loginInfo).then(function (response) {
            changeViewToProfile();
            deferred.resolve(response);
        }).catch(function (error) {
            changeViewToLogin();
            rememberMe() ? changeViewToProfile() : changeViewToLogin();
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
            userLoggedIn(response.data.logged) ? changeViewToProfile() : changeViewToLogin();
        }, function errorCallback(response) {
            rememberMe() ? changeViewToProfile() : changeViewToLogin();
        });
    }

    function RememberMe(loginInfo) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days

        cookies.put('ru', 'true', {expires: expireDate});
        cookies.put('e', $base64.encode(loginInfo), {expires: expireDate});

        LoginUser(loginInfo);
    }

    function changeViewToLogin() {
        window.location.href = "#/login";
    }

    function changeViewToProfile() {
        window.location.href = "#/profile";
    }

    function userLoggedIn(loginInfo) {
        return loginInfo == true;
    }

    function rememberMe() {
        return cookies.get('ru') === "true";
    }

}