'use strict';

angular

    .module('myApp.login', [
    'ngRoute',
    'ngCookies',
    'base64'
])

    .controller('loginController', function ($scope, $http, $cookies, $window, $base64, $httpParamSerializer, SERVER, LoginService) {

            initView();

            $scope.login = login;

            function login() {
                var rememberMe = $scope.rememberMeCheckbox;
                var loginInfo = $httpParamSerializer({email: $scope.email,
                    password: $scope.password});
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
                LoginService.login(loginInfo).then(function () {
                    showErrorMessage(); // TODO | FIX THE PROBLEM AND CHANGE THIS LINE TO hideErrorMessage();
                }).catch(function () {
                    showErrorMessage();
                });
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

            function validationLogin(){
                var email = document.getElementById('email');
                var psw = document.getElementById('password');

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

            function initView() {
                if (isRememberedUser()) {
                    LoginService.login($base64.decode($cookies.get('user_credentials')));
                } else {
                    LoginService.checkUser();
                }
            }

        });