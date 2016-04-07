'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginController'
  });
}])

.controller('loginController', function($scope) {
    $scope.title = "Prisijungimas";
    $scope.registration = 'Registracija';
    $scope.name = "Vartotojo vardas";
    $scope.password = 'Slaptažodis';
    $scope.forgotPassword = 'Pamiršai slaptažodį';
    $scope.loginButton = 'Prisijungti';
    $scope.rememberMe = 'Prisiminti';
});