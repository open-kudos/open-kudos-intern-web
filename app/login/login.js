'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginController'
  });
}])

.controller('loginController', function($scope) {
    $scope.tekstas = 'Login message';
});