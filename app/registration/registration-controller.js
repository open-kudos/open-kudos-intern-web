'use strict';

angular.module('myApp.registration', ['ngRoute', 'ngCookies'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registrationController'
        });
    }])

    .controller('registrationController', function ($scope, $http, $cookies, $window, RegistrationService) {
        /**
         * Registration method
         * Correct requestData needed to make call it also confirms user for now
         * TODO fix user confirmation in backend
         */
        $scope.Register = function () {

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
        var lang = $cookies.get('language');

        if (lang == null) {
            $cookies.put('language', 'en');
            setLanguage('en');
        } else {
            setLanguage(lang);
        }

        $scope.lt = function () {
            setLanguage('lt');
            $cookies.put('language', 'lt');
        };

        $scope.en = function () {
            setLanguage('en');
            $cookies.put('language', 'en');
        };

        function setLanguage(language) {
            $http.get('../app/translations/' + language + '.json').success(function (data) {
                $scope.language = data;
            })
        }
        /**
         *  ****************** End of language section ***********************
         */
    });