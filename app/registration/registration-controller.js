'use strict';

angular.module('myApp.registration', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registrationController'
        });
    }])

    .controller('registrationController', function ($scope, $http, $cookies, $window, RegistrationService) {
        var selectedLanguage = $cookies.get('language');
        $scope.changeLanguageToLT = changeLanguageToLT;
        $scope.changeLanguageToENG = changeLanguageToENG;

        initView();

        /**
         * Registration method
         * Correct requestData needed to make call it also confirms user for now
         * TODO fix user confirmation in backend
         */
        $scope.Register = function () {
            validationRegistration();

            var requestData = $.param({
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.password,
                confirmPassword: this.confirmPassword
            });

            RegistrationService.register(requestData).then(function (val) {
                RegistrationService.confirm(val.emailHash).then(function (val) {
                    $window.location.href = "#/login"
                });
            }).catch(function () {
                //TODO DELETE AFTER TEST
            })
        };
        /**
         ************************ Set language section ***********************
         */
        function initView() {
            if (selectedLanguage == null) {
                $cookies.put('language', 'en');
                setLanguage('en');
                selectedLanguage = $cookies.get('language');
                hideEnButton();
            } else {
                selectedLanguage == 'lt' ? hideLtButton() : hideEnButton();
                setLanguage(selectedLanguage);
            }
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

        function hideLtButton(){
            document.getElementById('enButton').className = 'btn btn-sm';           // TODO Please do this in angular way
            document.getElementById('ltButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
        }

        function hideEnButton(){
            document.getElementById('enButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
            document.getElementById('ltButton').className = 'btn btn-sm';           // TODO Please do this in angular way
        }
        /**
         *  ****************** End of language section ***********************
         */
        /**
         * Registration form validations
         */
        function validationRegistration() {
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