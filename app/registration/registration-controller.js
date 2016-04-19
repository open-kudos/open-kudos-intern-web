'use strict';

angular
    .module('myApp.registration', [
        'ngRoute',
        'ngCookies',
        'ngMessages',
        'base64'
    ])

    .config(function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registrationController'
        });
    })

    .controller('registrationController', function ($scope, $http, $cookies, $base64, $window, $translate, $httpParamSerializer, RegistrationService, LoginService) {
        var splited;
        $scope.register = register;
        $scope.split = split;

        function register() {
            var fullName = $scope.fullName;
            split(fullName);

            var requestData = $httpParamSerializer({
                email: $scope.email,
                firstName: splited[0],
                lastName: splited[1],
                password: $scope.password,
                confirmPassword: $scope.confirmPassword
            });
            RegistrationService.register(requestData).then(function (val) {
                RegistrationService.confirm(val.emailHash).then(function (val) {

                    var rememberMe = $scope.rememberMeCheckbox;
                    var loginInfo = $httpParamSerializer({
                        email: $scope.email,
                        password: $scope.password
                    });
                    if (rememberMe) {
                        rememberMeAndLogin(loginInfo)
                    } else {
                        loginAndValidate(loginInfo)
                    }

                });
            });
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

            })
        }

        function split(val){
            splited = val.split(' ');
            return splited;
        }
    });