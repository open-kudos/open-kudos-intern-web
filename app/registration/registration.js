'use strict';

angular.module('myApp.registration', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/registration', {
    templateUrl: 'registration/registration.html',
    controller: 'registrationController'
  });
}])

.controller('registrationController', function() {

});