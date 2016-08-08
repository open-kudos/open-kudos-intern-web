(function () {
    'use strict';
    angular
        .module('myApp.login', [
            'ngRoute',
            'ngCookies',
            'base64'
        ])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$cookies', '$base64', 'LoginService', '$location'];
    
    function LoginController($scope, $cookies, $base64, LoginService, $location) {

        var email = document.getElementById('email');
        var password = document.getElementById('password');

        $scope.showLoader = false;
        $scope.showError = false;
        $scope.domain = '.lt';

        $scope.login = login;
        $scope.isRememberedUser = isRememberedUser;
        $scope.rememberUser = rememberUser;
        $scope.validateEmail = validateEmail;

        function activate() {
            if (isRememberedUser()){
                loginWithoutRemember(getRememberedLoginInfo());
            } else {
                checkIfUserLoggedIn();
            }
        }
        activate();

        function login() {
            if (loginFormValid($scope.email, $scope.password))
                loginAndRemember(getLoginInfo());
        }
        
        function loginAndRemember(loginData) {
            LoginService.login(loginData).then(function (response) {
                if (responseValidation(response)) {
                    rememberUser();
                    $location.path("/home");
                }
            });
        }

        function loginWithoutRemember(loginData) {
            LoginService.login(loginData).then(function (response) {
                if (responseValidation(response)) {
                    $location.path("/home");
                }
            });
        }

        function checkIfUserLoggedIn() {
            LoginService.checkUser().then(function (val) {
                return val.data.logged;
            })
        }

        function rememberUser() {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 360); // Setting expiration date to 180 days
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode($scope.email + '@swedbank' + $scope.domain +":" +$scope.password), {expires: expireDate});
        }

        function loginFormValid(email, password) {
            if (email == null) {
                showError("Please enter Email");
            } else if (password == null) {
                showError("Please enter Password");
            } else if (!validateEmail(email)) {
                showError("Wrong email format");
            } else {
                return true;
            }
        }

        function responseValidation(response) {
            if (response == "user_not_exist") {
                showError("User not exists");
            } else if (response == "email_password_mismatch") {
                showError("Wrong email or password");
            } else if (response == "user_not_confirmed") {
                showError("User not confirmed ");
            } else {
                return true;
            }
        }

        function validateEmail(email) {
            var reg = /[a-zA-Z]\W[a-zA-Z]/;
            if (reg.test(email)){
                reg = /@/;
                return !reg.test(email);
            } else return reg.test(email);
        }

        function showError(message) {
            $scope.errorMessage = message;
            $scope.showError = true;
            return false;
        }

        function isRememberedUser() {
            if ($cookies.get('remember_user') != null && $cookies.get('remember_user') != undefined){
                return $cookies.get('remember_user') === 'true';
            } else {
                return false;
            }
        }

        function getLoginInfo() {
            return {
                email: $scope.email + '@swedbank' + $scope.domain,
                password: $scope.password
            };
        }

        function getRememberedLoginInfo() {
            if ($cookies.get('user_credentials') != null && $cookies.get('user_credentials') != undefined) {
                var credentials = $base64.decode($cookies.get('user_credentials')).split(":");
                return {
                    email: credentials[0],
                    password: credentials[1]
                }
            } else {
                return false;
            }
        }

    }

})();