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
            var name = document.getElementById('name');
            var surname = document.getElementById('surname');
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            var confirmPassword = document.getElementById('confirmPassword');
            var nameError = document.getElementById('nameError');
            var surnameError = document.getElementById('surnameError');
            var emailError = document.getElementById('emailError');
            var passwordError = document.getElementById('passwordError');
            var confirmPasswordError = document.getElementById('confirmPasswordError');
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