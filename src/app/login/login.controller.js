(function () {
    'use strict';
    function LoginController($scope, $cookies, $base64, $httpParamSerializer, LoginService) {

        var email = document.getElementById('email');
        var password = document.getElementById('password');

        $scope.showLoader = false;
        $scope.showError = false;

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

            if ($scope.email == null) {
                showError("Please enter Email");
            } else if ($scope.password == null) {
                showError("Please enter Password");
            } else if (!validateEmail($scope.email)) {
                showError("Wrong email format");
            } else {
                rememberMe ? rememberMeAndLogin(loginInfo) : validateAndLogin(loginInfo)
            }
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
                    if (response == "user_not_exist") {
                        showError("User not exists");
                    } else if (response == "email_password_mismatch") {
                        showError("Wrong email or password");
                    } else if (response == "user_not_confirmed") {
                        showError("User not confirmed ");
                    }
                })
            }
        }

        function showError(message) {
            $scope.errorMessage = message;
            $scope.showError = true;
        }

        function validateEmail(email) {
            var reg = /[@]swedbank.[a-z]{2,}/;
            return reg.test(email);
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