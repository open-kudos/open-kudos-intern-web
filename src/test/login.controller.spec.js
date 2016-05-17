/**
 * Created by vytautassugintas on 17/05/16.
 */
/**
 * Created by Chris on 2016-05-17.
 */
"use strict";
describe('LoginController', function() {

    var $scope;
    var $controller;
    var someServiceMock;

    var loginInfo = {
        email: "test@swedbank.lt",
        password: "123"
    };

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
            controller = $controller('LoginController', { $scope: $scope });
        });

        it('sets the strength to "strong" if the password length is >8 chars', function() {
            expect(true).toEqual(true);
        });

        it('it should check if user is remembered', function() {
            $scope.rememberUser(loginInfo);
            expect($scope.isRememberedUser()).toEqual(true);
        });

        it('it should check if user is cleared from cookies', function () {
            
        })
    });
});