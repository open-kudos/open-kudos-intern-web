"use strict";
describe('LoginController', function() {

    var $scope;
    var serviceMock;
    var $controller;

    var loginInfo = {
        email: "test@swedbank.lt",
        password: "123"
    };

    beforeEach(function (){
        serviceMock = jasmine.createSpyObj('someService', ['someAsyncCall']); // Example how to mock services
        module('myApp');
    });

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function(_$controller_) {
        $scope = {};
        $controller = _$controller_('LoginController', { $scope: $scope });
    }));
 
    it('should check if user is remembered', function() {
        $scope.rememberUser(loginInfo);
        expect($scope.isRememberedUser()).toEqual(true);
    });

    it('should check if email field contains ".", letter before and after', function() {
        $scope.email = 't.t';
        expect($scope.validateEmail($scope.email)).toEqual(true);
        $scope.email = 't.';
        expect($scope.validateEmail($scope.email)).toEqual(false);
        $scope.email = '.t';
        expect($scope.validateEmail($scope.email)).toEqual(false);
        $scope.email = '.';
        expect($scope.validateEmail($scope.email)).toEqual(false);
    });
});