"use strict";
describe('KudosNavbarComponent', function() {

    var location;
    var locationSpy;
    var someServiceMock;

    beforeEach(function (){
        someServiceMock = jasmine.createSpyObj('someService', ['someAsyncCall']); // Example how to mock services
        module('myApp');
    });

    var component, scope, $componentController;

    beforeEach(module('myApp'));
    beforeEach(module('myApp.components.navbar'));

    beforeEach(inject(function ($rootScope, _$componentController_, $location) {
        scope = $rootScope.$new();

        $componentController = _$componentController_;

        component = $componentController('kudosNavbar',
            null,
            {controller: 'KudosNavbarController'}
        );

        location = $location;
        locationSpy = spyOn(location, 'path', false).and.returnValue("/profile");
    }));

    describe('KudosNavbarController', function() {
        it('it should check #/profile location path', function() {
            expect(location.path).toHaveBeenCalled();
            expect(component.selectedHome).toBe(true);
        });

        it('it should check #/acorns location path', function() {
            setLocationSpyPathAndActivateComponent("/acorns");
            expect(component.selectedAcorns).toBe(true);
        });

        it('it should check #/leaderboard location path', function() {
            setLocationSpyPathAndActivateComponent("/leaderboard");
            expect(component.selectedLeaderboard).toBe(true);
        });

        it('it should check #/me location path', function() {
            setLocationSpyPathAndActivateComponent("/me");
            expect(component.selectedProfile).toBe(true);
        });

    });

    function setLocationSpyPathAndActivateComponent(path) {
        location.path.and.returnValue(path);
        component.activate();
    }

});