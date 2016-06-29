"use strict";
describe('User history', function() {
    var scope = null,
        $componentController,
        component,
        httpParamSerializer,
        $httpBackend;

    beforeEach(module('myApp'));

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, _$componentController_, _$httpBackend_, $httpParamSerializer) {
        scope = $rootScope.$new();

        $componentController = _$componentController_;
        component = $componentController('UserHistoryController');

        httpParamSerializer = $httpParamSerializer;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'app/translations/locale-en.json').respond();
        $httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('Controller', function() {
/*
        it('should update list for "all" tab transactions', function () {
            var email = 'test.test@swedbank.lt';
            expect(ctrl.updateListAll(email, true)).toBe();
        });*/

    });
});