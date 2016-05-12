/**
 * Created by vytautassugintas on 06/04/16.
 */
(function () {
    "use strict";
    angular.module("myApp")
        .factory("LoginService", LoginService);

    LoginService.$inject = [
        "Auth",
        "$cookies",
        "$base64",
        "$location"
    ];

    function LoginService(authBackend, $cookies, $base64, $location) {
        var service = {
            login: LoginUser,
            checkUser: CheckUser,
            rememberMe: RememberMe
        };
        return service;

        function LoginUser(loginInfo) {
            return authBackend.login(loginInfo).then(function () {
                CheckUser();
            })
        }

        function CheckUser() {
            return authBackend.check().then(function (val) {
                userLoggedIn(val.data.logged) ? changeViewToProfile() : changeViewToLogin();
                return val;
            });
        }

        function RememberMe(loginInfo) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180);
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
            LoginUser(loginInfo);
        }

        function changeViewToLogin() {
            $location.path("/login");
        }

        function changeViewToProfile() {
            $location.path("/profile");
        }

        function userLoggedIn(loginInfo) {
            return loginInfo == true;
        }

    }
})();