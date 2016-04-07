'use strict';

angular.module('myApp.registration', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'registrationController'
  });
}])

.controller('registrationController', function($scope, $cookies) {
    var language;

    if (!$cookies.get('language')) {
        $cookies.put('language', 'en');
        language = $cookies.get('language');

    } else language = $cookies.get('language');

    if (language == 'en') {
        $scope.title = "Registration";
        $scope.login = 'Login';
        $scope.name = "Username";
        $scope.surname = "Surname";
        $scope.email = 'Email';
        $scope.password = 'Password';
        $scope.confirmPassword = 'Confirm password';
        $scope.registerButton = 'Register';
    } else if (language == 'lt'){
        $scope.title = "Registracija";
        $scope.login = 'Prisijungimas';
        $scope.name = "Vardas";
        $scope.surname = "Pavardė";
        $scope.email = 'El. paštas';
        $scope.password = 'Slaptažodis';
        $scope.confirmPassword = 'Pakartokite slaptažodį';
        $scope.registerButton = 'Registruotis';
    }

    $scope.lt = function() {
        $scope.title = "Registracija";
        $scope.login = 'Prisijungimas';
        $scope.name = "Vardas";
        $scope.surname = "Pavardė";
        $scope.email = 'El. paštas';
        $scope.password = 'Slaptažodis';
        $scope.confirmPassword = 'Pakartokite slaptažodį';
        $scope.registerButton = 'Registruotis';
        $cookies.put('language', 'lt');
    };

    $scope.en = function() {
        $scope.title = "Registration";
        $scope.login = 'Login';
        $scope.name = "Username";
        $scope.surname = "Surname";
        $scope.email = 'Email';
        $scope.password = 'Password';
        $scope.confirmPassword = 'Confirm password';
        $scope.registerButton = 'Register';
        $cookies.put('language', 'en');
    };
});