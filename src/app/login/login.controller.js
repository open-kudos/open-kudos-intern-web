(function () {
    'use strict';
    function LoginController($scope, $cookies, $base64, $httpParamSerializer, LoginService) {

        var email = document.getElementById('email');
        var password = document.getElementById('password');

        $scope.showLoader = false;

        $scope.login = login;
        $scope.isRememberedUser = isRememberedUser;
        $scope.rememberUser = rememberUser;

        function activate() {
            isRememberedUser() ? LoginService.login($base64.decode($cookies.get('user_credentials'))) : LoginService.checkUser();
        }

        activate();

        function login() {
            var rememberMe = $scope.rememberMeCheckbox;
            var loginInfo = {
                    email: $scope.email,
                    password: $scope.password
                };

            loginValidation();
            rememberMe ? rememberMeAndLogin(loginInfo) : validateAndLogin(loginInfo)
        }

        function rememberMeAndLogin(loginInfo) {
            rememberUser(loginInfo);
            LoginService.login(loginInfo);
        }

        function rememberUser(loginInfo) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
        }

        function validateAndLogin(loginInfo) {
            $scope.showLoader = true;
            if ($scope.email === "" || $scope.password === "") {
                $scope.emailErrorMessage = "Please enter Email";
            } else if ($scope.password == "") {
                $scope.passwordErrorMessage = "Please enter Password";
            } else {
                LoginService.login(loginInfo).then(function (response) {
                    $scope.showLoader = false;
                    response === "Error" ? showErrorMessage() : hideErrorMessage();
                })
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

        function loginValidation() {
            email.value == '' ? email.className = 'notValid' : email.className = 'valid';
            password.value == '' ? password.className = 'notValid' : password.className = 'valid'
        }

        function isRememberedUser() {
            return $cookies.get('remember_user') === 'true'
        }
    }

    LoginController.$inject = ['$scope', '$cookies', '$base64', '$httpParamSerializer', 'LoginService'];

    angular
        .module('myApp.login', [
            'ngRoute',
            'ngCookies',
            'base64'
        ])
        .controller('LoginController', LoginController);

})();