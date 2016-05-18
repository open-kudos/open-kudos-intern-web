/**
 * Created by Chris on 2016-05-17.
 */
"use strict";
describe('registrationController', function() {

    var $scope;
    var $controller;
    var someServiceMock;
    var controller;

    beforeEach(function (){
        someServiceMock = jasmine.createSpyObj('someService', ['someAsyncCall']); // Example how to mock services
        module('myApp');
    });

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('Registration controller', function() {
        beforeEach(function() {
            $scope = {};
            controller = $controller('registrationController', { $scope: $scope });
        });

        it('Full name should be splited to "Name" and "Surname" ', function() {
            $scope.fullName = 'Name Surname';
            expect($scope.split($scope.fullName)[0]).toEqual('Name');
            expect($scope.split($scope.fullName)[1]).toEqual('Surname');
        });
        
        it('Email should contain "@swedbank."', function () {
            $scope.email = 'sasasas.sss@swedbank.lt';
            expect($scope.checkEmail($scope.email)).toBeTruthy();
        });

        it('"Password" and "confirmPassword" must match', function () {
            $scope.password = 'password';
            $scope.confirmPassword = 'password';
            expect($scope.checkPasswordMatch($scope.password, $scope.confirmPassword)).toBeTruthy();
        });
    });
});