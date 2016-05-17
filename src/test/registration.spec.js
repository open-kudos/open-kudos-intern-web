/**
 * Created by Chris on 2016-05-17.
 */
"use strict";
describe('registrationController', function() {

    var $scope;
    var $controller;
    var someServiceMock;

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

    describe('$scope.grade', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {};
            controller = $controller('registrationController', { $scope: $scope });
        });

        it('sets the strength to "strong" if the password length is >8 chars', function() {
            $scope.password = 'longerthaneightchars';
            $scope.grade();
            expect($scope.strength).toEqual('strong');
        });

        it('sets the strength to "weak" if the password length <3 chars', function() {
            $scope.password = 'a';
            $scope.grade();
            expect($scope.strength).toEqual('weak');
        });
    });
});