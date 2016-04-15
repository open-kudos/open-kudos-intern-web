'use strict';

angular.module('myApp.registration', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', '$cookiesProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registrationController'
        });
    }])
    .controller('registrationController', function ($scope, $http, $cookies, $window, $translate, $httpParamSerializer, RegistrationService) {

        $scope.register = register;

        function register() {
            registrationValidation();
            var requestData = $httpParamSerializer({
                email: $scope.email,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                password: $scope.password,
                confirmPassword: $scope.confirmPassword
            });
            RegistrationService.register(requestData).then(function (val) {
                RegistrationService.confirm(val.emailHash).then(function (val) {
                    $window.location.href = "#/login"
                });
            });
        }

        /**
         * Registration form validations
         */
        function registrationValidation() {
            var name = angular.element('#name').get(0);
            var surname = angular.element('#surname').get(0);
            var email = angular.element('#email').get(0);
            var password = angular.element('#password').get(0);
            var confirmPassword = angular.element('#confirmPassword').get(0);
            var nameError = angular.element('#nameError').get(0);
            var surnameError = angular.element('#surnameError').get(0);
            var emailError = angular.element('#emailError').get(0);
            var passwordError = angular.element('#passwordError').get(0);
            var confirmPasswordError = angular.element('#confirmPasswordError').get(0);
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            if (name.value == '') {
                nameError.className = '';
                name.className = 'notValid';
            } else {
                nameError.className = 'hidden';
                name.className = 'valid';
            }
            if (surname.value == '') {
                surnameError.className = '';
                surname.className = 'notValid';
            } else {
                surnameError.className = 'hidden';
                surname.className = 'valid';
            }
            if (confirmPassword.value == '') {
                confirmPasswordError.className = '';
                confirmPassword.className = 'notValid';
            } else {
                confirmPasswordError.className = 'hidden';
                confirmPassword.className = 'valid';
            }
            if (email.value == '') {
                emailError.className = '';
                email.className = 'notValid';
            } else if (!filter.test(email.value)) {
                emailError.className = '';
                email.className = 'notValid';
            } else {
                emailError.className = 'hidden';
                email.className = 'valid';
            }
            if (password.value == '') {
                passwordError.className = '';
                password.className = 'notValid';
            } else {
                passwordError.className = 'hidden';
                password.className = 'valid';
            }
        }

    });