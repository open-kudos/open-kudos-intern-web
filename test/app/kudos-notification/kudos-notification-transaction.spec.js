"use strict";
describe('Notifications Controller', function() {

    var scope;
    var $httpBackend;
    var rootScope;
    var ctrl;
    var locationSpy;
    var someServiceMock;
    var serverService;

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

    beforeEach(inject(function (_$controller_) {
        scope = {};
        ctrl = _$controller_('NotificationsController', { $scope: scope });
    }));

    describe('NotificationsController', function() {

        it('it should clear notifications', function() {
            ctrl.newTransactionCollection = ['test', 'test'];
            ctrl.notificationBadgeAmount = 1;
            ctrl.clearNotifications();
            expect(ctrl.notificationBadgeAmount).toBe(0);
        });

        it('should return word acorn in plural', function () {
            expect('2 Acorns').toBe(ctrl.acornPlural(2));
        });

        it('should return word acorn not in plural', function () {
            expect('1 Acorn').toBe(ctrl.acornPlural(1));
        });
        
        it('should check for notifications', function () {
            ctrl.checkNotifications();
            expect(0).toBe(ctrl.newTransactionCollection.length);
        });

    });
});