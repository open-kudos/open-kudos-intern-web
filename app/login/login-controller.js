'use strict';

angular.module('myApp.login', ['ngRoute', 'ngCookies', 'base64'])
    .config(function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginController'
        });
    })

    .controller('loginController', ['$scope', '$http', '$cookies', '$window', '$base64', 'SERVER', 'LoginService',
        function ($scope, $http, $cookies, $window, $base64, SERVER, LoginService) {

            var selectedLanguage = $cookies.get('language');

            initView();

            $scope.login = login;
            $scope.changeLanguageToLT = changeLanguageToLT;
            $scope.changeLanguageToENG = changeLanguageToENG;

            function login() {
                var rememberMe = $scope.rememberMeCheckbox;
                var loginInfo = $.param({email: $scope.email, password: $scope.password});
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
                    $scope.loginError = '';
                }).catch(function () {
                    loginValidation($scope.email, $scope.password);
                });
            }

            function loginValidation(email, password) {
                if ((email == '') || (password == '')) {
                    $scope.loginError = 'Wrong Email and Password';
                } else {
                    $scope.loginError = 'Wrong Email or Password';
                }
            }

            function isRememberedUser() {
                return $cookies.get('remember_user') === 'true'
            }

            function changeLanguageToLT() {
                setLanguage('lt');
                $cookies.put('language', 'lt');
                hideLtButton();
            }

            function changeLanguageToENG() {
                setLanguage('en');
                $cookies.put('language', 'en');
                hideEnButton();

            }

            function setLanguage(language) {
                $http.get('../app/translations/' + language + '.json').success(function (data) {
                    $scope.language = data;
                })
            }

            function initView() {
                if (selectedLanguage == null) {
                    $cookies.put('language', 'en');
                    setLanguage('en');
                    selectedLanguage = $cookies.get('language');
                    hideEnButton();
                } else {
                    setLanguage(selectedLanguage);
                    selectedLanguage == 'lt' ? hideLtButton() : hideEnButton();
                }

                if (isRememberedUser()) {
                    LoginService.login($base64.decode($cookies.get('e')));
                } else {
                    LoginService.checkUser();
                }
            }

            function hideLtButton(){
                document.getElementById('enButton').className = 'btn btn-sm';           // TODO Please do this in angular way
                document.getElementById('ltButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
            }

            function hideEnButton(){
                document.getElementById('enButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
                document.getElementById('ltButton').className = 'btn btn-sm';           // TODO Please do this in angular way
            }

        }]);