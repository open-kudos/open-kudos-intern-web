/**
 * Created by vytautassugintas on 08/06/16.
 */
/**
 * Created by vytautassugintas on 07/06/16.
 */
"use strict";
describe('NotificationComponent', function() {

    var scope;
    var $httpBackend;
    var rootScope;
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

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        createController($controller);

        $httpBackend = _$httpBackend_;
        $httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('NotificationsController', function() {

        it('it should clear notifications', function() {
            scope.newTransactionCollection = ['test', 'test'];
            scope.notificationBadgeAmount = 1;
            scope.clearNotifications();
            expect(scope.notificationBadgeAmount).toBe(0);
        });

        it('should return word acorn in plural', function () {
            expect('2 Acorns').toBe(scope.acornPlural(2));
        });

        it('should return word acorn not in plural', function () {
            expect('1 Acorn').toBe(scope.acornPlural(1));
        });
        
        it('should check for notifications', function () {
            scope.checkNotifications();
            expect(0).toBe(scope.newTransactionCollection.length);
        });

    });

    function createController($controller) {
        $controller('NotificationsController', {
            $scope: scope
        });
    }

});