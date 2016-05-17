(function () {
    'use strict';
    function LoginController($scope, $cookies, $base64, $httpParamSerializer, LoginService) {

        var email = document.getElementById('email');
        var psw = document.getElementById('password');

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
            rememberUser(loginInfo);
            LoginService.login(loginInfo);
        }

        function rememberUser(loginInfo) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
        }

        function loginAndValidate(loginInfo) {
            $scope.showLoader = true;
            if ($scope.email === "" || $scope.password === "") {
                $scope.emailErrorMessage = "Please enter Email";
            } else if ($scope.password == "") {
                $scope.passwordErrorMessage = "Please enter Password";
            } else {
                LoginService.login(loginInfo).then(function (response) {
                    $scope.showLoader = false;
                    if (response === "Error") {
                        showErrorMessage();
                    }else{
                        hideErrorMessage();
                    }
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