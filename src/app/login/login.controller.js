(function () {
    'use strict';
    function LoginController($scope, $http, $cookies, $window, $base64, $httpParamSerializer, SERVER, LoginService) {

        var email = document.getElementById('email');
        var psw = document.getElementById('password');

        $scope.showLoader = false;

        activate();

        $scope.login = login;

        function login() {
            var rememberMe = $scope.rememberMeCheckbox;
            var loginInfo = $httpParamSerializer({
                email: $scope.email,
                password: $scope.password
            });
            validationLogin();
            if (rememberMe) {
                rememberMeAndLogin(loginInfo)
            } else {
                loginAndValidate(loginInfo)
            }
        }

        function rememberMeAndLogin(loginInfo) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
            LoginService.login(loginInfo);
        }

        function loginAndValidate(loginInfo) {
            $scope.showLoader = true;
            if ($scope.email === "" || $scope.password === "") {
                $scope.emailErrorMessage = "Please enter Email";
            } else if ($scope.password == "") {
                $scope.passwordErrorMessage = "Please enter Password";
            } else {
                LoginService.login(loginInfo).then(function (val) {
                    $scope.showLoader = false;
                    showErrorMessage(); // TODO | FIX THE PROBLEM AND CHANGE THIS LINE TO hideErrorMessage();
                }).catch(function () {
                    $scope.showLoader = false;
                    showErrorMessage();
                });
            }
        }

        function showErrorMessage() {
            var errorMessage = document.getElementById('errorMessage');
            errorMessage.className = 'errorMessage';
        }

        function hideErrorMessage() {
            var errorMessage = document.getElementById('errorMessage');
            errorMessage.className = 'errorMessage hidden';
        }

        function isRememberedUser() {
            return $cookies.get('remember_user') === 'true'
        }

        function validationLogin() {


            if (email.value == '') {
                email.className = 'notValid';
            } else {
                email.className = 'valid';
            }

            if (psw.value == '') {
                psw.className = 'notValid';
            } else {
                psw.className = 'valid';
            }
        }

        function activate() {
            if (isRememberedUser()) {
                LoginService.login($base64.decode($cookies.get('user_credentials')));
            } else {
                LoginService.checkUser();
            }
        }

    }

    angular
        .module('myApp.login', [
            'ngRoute',
            'ngCookies',
            'base64'
        ])
        .controller('LoginController', LoginController);

})();