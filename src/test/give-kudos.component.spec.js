"use strict";
describe('Component: GiveAcornsComponent', function() {
    var component, scope, hero, $componentController;

    beforeEach(module('myApp'));
    beforeEach(module('myApp.components.giveKudos'));

    beforeEach(inject(function($rootScope, _$componentController_) {
        scope = $rootScope.$new();
        $componentController = _$componentController_;
        component = $componentController('kudosGiveKudos',
            null,
            {template: 'button'}
        );
    }));

    it('should have error variables', function() {
        expect(component.showError).toBeDefined();
        expect(component.errorMessage).toBeDefined();
    });

    it('should have user variables', function() {
        expect(component.userAvailableKudos).toBeDefined();
        expect(component.usersCollection).toBeDefined();
    });

    it('should have function that selects text', function() {
        component.selectAutoText("test");
        expect(component.text).toBe("test");
    });
    
    it('should have function that shows error', function() {
        component.showValidationErrorMessage("test");
        expect(component.errorMessage).toBe("test");
    });

    it('should return false if sendTo input is empty', function() {
        component.sendKudosTo = null;
        expect(component.sendKudosValidation()).toBe(false);
    });

    it('should return false if amount input is empty', function() {
        component.sendKudosAmount = null;
        expect(component.sendKudosValidation()).toBe(false);
    });

    it('should check sendTo field email', function() {
        component.sendKudosTo = "krabas.batas@swedbank.lt";
        component.sendKudosAmount = 1;
        expect(component.sendKudosValidation()).toBe(true);
    });

    it('should check check bad email', function() {
        component.sendKudosTo = "krabas.batas@koma.lt";
        component.sendKudosAmount = 1;
        expect(component.sendKudosValidation()).toBe(false);
    });


});