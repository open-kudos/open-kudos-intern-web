/**
 * Created by vytautassugintas on 07/06/16.
 */
"use strict";
describe('KudosNavbarComponent', function() {

    var scope;
    var location;
    var rootScope;
    var locationSpy;
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

    beforeEach(inject(function ($controller, $rootScope, $location) {
        scope = $rootScope.$new();
        location = $location;
        locationSpy = spyOn(location, 'path', false).and.returnValue("/profile");
        createController($controller);
    }));

    describe('KudosNavbarController', function() {
        it('it should check #/profile location path', function() {
            expect(location.path).toHaveBeenCalled();
            expect(scope.selectedHome).toBe(true);
        });

        it('it should check #/acorns location path', function() {
            setLocationSpyPathAndActivateComponent("/acorns");
            expect(scope.selectedAcorns).toBe(true);
        });

        it('it should check #/leaderboard location path', function() {
            setLocationSpyPathAndActivateComponent("/leaderboard");
            expect(scope.selectedLeaderboard).toBe(true);
        });

        it('it should check #/me location path', function() {
            setLocationSpyPathAndActivateComponent("/me");
            expect(scope.selectedProfile).toBe(true);
        });

    });

    function createController($controller) {
        $controller('KudosNavbarController', {
            $scope: scope,
            $location: location
        });
    }
    
    function setLocationSpyPathAndActivateComponent(path) {
        location.path.and.returnValue(path);
        scope.activate();
    }

});