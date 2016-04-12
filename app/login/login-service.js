/**
 * Created by vytautassugintas on 06/04/16.
 */
"use strict";
angular.module("myApp")
    .factory("LoginService", LoginService);

LoginService.$inject = [
    "Auth",
    "$window",
    "$cookies",
    "$base64"
];

function LoginService(authBackend, $window, $cookies, $base64) {
    var service = {
        login: LoginUser,
        checkUser: CheckUser,
        rememberMe: RememberMe
    };
    return service;

    function LoginUser(loginInfo) {
        return authBackend.login(loginInfo).then(function () {
            changeViewToProfile();
        })
    }

    function CheckUser() {
        authBackend.check().then(function (val){
            userLoggedIn(val.data.logged) ? changeViewToProfile() : changeViewToLogin();
        });
    }

    function RememberMe(loginInfo) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
        $cookies.put('remember_user', 'true', {expires: expireDate});
        $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
        LoginUser(loginInfo);
    }

    function changeViewToLogin() {
        $window.location.href = "#/login";
    }

    function changeViewToProfile() {
        $window.location.href = "#/profile";
    }

    function userLoggedIn(loginInfo) {
        return loginInfo == true;
    }

}