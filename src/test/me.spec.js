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

        it('should not be possible to give string longer than 20 for first name', function () {
            ctrl.firstNameEdit = '123456789012345678901';
            expect(ctrl.lengthLimit(ctrl.firstNameEdit, 20)).toBe('12345678901234567890');
        });

        it('should not be possible to give string longer than 30 for last name', function () {
            ctrl.lastNameEdit = '1234567890123456789012345678901';
            expect(ctrl.lengthLimit(ctrl.lastNameEdit, 30)).toBe('123456789012345678901234567890');
        });

        it('should not be possible to give empty string for first name', function () {
            ctrl.firstNameEdit = "";
            expect(ctrl.checkInputs()).toBe("First name can't be empty");
        });

        it('should not be possible to give empty string for last name', function () {
            ctrl.firstNameEdit = 'a';
            ctrl.lastNameEdit = '';
            expect(ctrl.checkInputs()).toBe("Last name can't be empty");
        });

        it('should be possible to split date', function () {
            var val = '2000-01-01 12:20';
            expect(ctrl.splitDate(val)).toBe('2000-01-01');
        });

        it('should be possible to enter multi language letters', function () {
            var val = 'ąčęėįšųūžĄČĘĖĮŠŲŪŽåäöÅÄÖĀĒĢĪĶĻŅēīāņļķģüÜÕõ qwertyuiopasdfghjklzxcvbnm QWERTYUIOPLKJHGFDSAMNBVCXZ';
            expect(ctrl.checkPattern(val)).toBeFalsy();
        });

        it('should not be possible to enter symbols or numbers', function () {
            var val = '[];./, 0123456789';
            expect(ctrl.checkPattern(val)).toBeTruthy();
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