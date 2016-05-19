(function () {
    'use strict';

    var registrationController = function ($scope, $http, $cookies, $base64, $window, $translate, $httpParamSerializer, RegistrationService, LoginService) {
        var checkSplited = false;
        var splited = [];

        $scope.showLoader = false;

        $scope.register = register;
        $scope.split = split;
        $scope.checkEmail = checkEmail;
        $scope.checkPasswordMatch = checkPasswordMatch;
        $scope.showErrorMessage = showErrorMessage;

        function register() {
            var fullName = $scope.fullName;
            var email = checkEmail($scope.email);
            var passwordMatch = checkPasswordMatch($scope.password, $scope.confirmPassword);
            split(fullName);

            if (checkSplited && email && passwordMatch) {
                var requestData = $httpParamSerializer({
                    email: email,
                    firstName: splited[0],
                    lastName: splited[1],
                    password: $scope.password,
                    confirmPassword: $scope.confirmPassword
                });

                RegistrationService.register(requestData).then(function (val) {
                    showErrorMessage("");
                    if (val != "Error") {
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
                    } else showErrorMessage("User already exists");
                });
            }
        }

        function checkEmail(val) {
            if (val.indexOf('@swedbank.') > -1)
                return val;
            else 
                return false;
        }
        
        function checkPasswordMatch(psw, confPsw) {
            return psw == confPsw;
        }

        function rememberMeAndLogin(loginInfo) {
            $scope.showLoader = false;
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180); // Setting expiration date to 180 days
            $cookies.put('remember_user', 'true', {expires: expireDate});
            $cookies.put('user_credentials', $base64.encode(loginInfo), {expires: expireDate});
            LoginService.login(loginInfo).then(function () {
                $scope.showLoader = false;
            });
        }

        function loginAndValidate(loginInfo) {
            $scope.showLoader = true;
            LoginService.login(loginInfo).then(function () {
                $scope.showLoader = false;
            })
        }

        function showErrorMessage(val){
            $scope.errorMessage = val;
        }

        function split(val) {
            if (val) {
                splited = val.split(' ');
                if (val[1]) checkSplited = true;
                return splited;
            }
        }
    };

    registrationController.$inject = ['$scope', '$http', '$cookies', '$base64', '$window', '$translate', '$httpParamSerializer', 'RegistrationService', 'LoginService'];

    angular
        .module('myApp.registration', [
            'ngRoute',
            'ngCookies',
            'ngMessages',
            'base64'
        ])
        .controller('registrationController', registrationController)
        .directive("passwordVerify", function () {
            return {
                require: "ngModel",
                scope: {
                    passwordVerify: '='
                },
                link: function (scope, element, attrs, ctrl) {
                    scope.$watch(function () {
                        var combined;

                        if (scope.passwordVerify || ctrl.$viewValue) {
                            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
                        }
                        return combined;
                    }, function (value) {
                        if (value) {
                            ctrl.$parsers.unshift(function (viewValue) {
                                var origin = scope.passwordVerify;
                                if (origin !== viewValue) {
                                    ctrl.$setValidity("passwordVerify", false);
                                    return undefined;
                                } else {
                                    ctrl.$setValidity("passwordVerify", true);
                                    return viewValue;
                                }
                            });
                        }
                    });
                }
            };
        });
})();