"use strict";
describe('Me (profile)', function() {
    var scope = null;
    var ctrl = null;
    var httpParamSerializer,
        $httpBackend;

    beforeEach(module('myApp'));

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $httpParamSerializer) {
        scope = $rootScope.$new();

        ctrl = $controller('MeController', {
            $scope: scope
        });

        httpParamSerializer = $httpParamSerializer;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'app/translations/locale-en.json').respond();
        $httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('Controller', function() {

        it('should set values for view mode', function () {
            var val = {
                firstName: 'Name',
                lastName: 'Last',
                birthday: '2000-01-01 12:20',
                startedToWork: '2010-11-11 11:10'
            };
            ctrl.setValuesView(val);
            expect(ctrl.firstName).toBe('Name');
            expect(ctrl.birthday).toBe('2000-01-01 12:20');
        });

        it('should set values for edit mode', function () {
            var val = {
                firstName: 'Name',
                lastName: 'Last',
                birthday: '2000-01-01 12:20',
                startedToWork: '2010-11-11 11:10'
            };
            ctrl.setValuesEdit(val);
            expect(ctrl.firstNameEdit).toBe('Name');
            expect(ctrl.birthdayEdit).toBeGreaterThan(0);
        });

        it('should be possible to split date', function () {
            var val = '2000-01-01 12:20';
            expect(ctrl.splitDate(val)).toBe('2000-01-01');
        });

        it('"completed" status should be set to true if both values is not null', function () {
            var value1 = 'not null';
            var value2 = 'not null';
            var val = {
                completed: false
            };
            ctrl.checkIsCompleted(value1, value2, val);
            expect(val.completed).toBeTruthy();
        });

        it('"completed" status should be left to false if one of the values is null', function () {
            var value1 = 'not null';
            var value2 = null;
            var val = {
                completed: false
            };
            ctrl.checkIsCompleted(value1, value2, val);
            expect(val.completed).toBeFalsy();

            value1 = null;
            value2 = 'not null';
            ctrl.checkIsCompleted(value1, value2, val);
            expect(val.completed).toBeFalsy();

            value1 = null;
            value2 = null;
            ctrl.checkIsCompleted(value1, value2, val);
            expect(val.completed).toBeFalsy();
        });
    });
});