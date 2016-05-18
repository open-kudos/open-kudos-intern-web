/**
 * Created by vytautassugintas on 17/05/16.
 */
/**
 * Created by Chris on 2016-05-17.
 */
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

    //TODO Complete these
    it('should ensure invalid email addresses are caught', function () {});
    it('should ensure valid email addresses pass validation', function () {});
    it('should show error messages for empty fields', function () {});
});