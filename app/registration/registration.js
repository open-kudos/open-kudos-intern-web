'use strict';

angular.module('myApp.registration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'registrationController'
  });
}])

.controller('registrationController', function($scope) {
  $scope.title = "Registracija";
  $scope.login = 'Prisijungimas';
  $scope.name = "Vardas";
  $scope.surname = "Pavardė";
  $scope.email = 'El. paštas';
  $scope.password = 'Slaptažodis';
  $scope.confirmPassword = 'Pakartokite slaptažodį';
  $scope.registerButton = 'Registruotis';
});