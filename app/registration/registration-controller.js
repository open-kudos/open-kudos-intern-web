'use strict';

angular
    .module('myApp.registration', [
        'ngRoute',
        'ngCookies',
        'ngMessages'
    ])

    .config(function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'registrationController'
        });
    })

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
    });