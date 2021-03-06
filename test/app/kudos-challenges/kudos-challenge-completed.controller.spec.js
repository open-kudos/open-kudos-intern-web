"use strict";
describe('CompletedChallengesController', function() {

    var component, scope, hero, $componentController;

    beforeEach(module('myApp'));
    beforeEach(module('myApp.components.completedChallenges'));

    beforeEach(inject(function($rootScope, _$componentController_) {
        scope = $rootScope.$new();

        $componentController = _$componentController_;

        component = $componentController('kudosChallengeCompleted',
            null,
            {controller: 'kudosChallengeCompleted'}
        );


    }));
    
    describe('Completed challenges controller', function() {
        it('should check if show more button is being displayed', function() {
            var collectionOfMoreThanFiveElements = [1,2,3,4,5,6];
            component.showMoreButton(collectionOfMoreThanFiveElements);
            expect(component.showMoreButton).toBeTruthy();
        });

        it('should check if show more button is being hidden', function() {
            var collectionOfLessThanFiveElements = [1];
            component.showMoreButton(collectionOfLessThanFiveElements);
            expect(component.showMoreButton).toBeFalsy();
        });

        it('should check if amount of sent acorns equals to 1', function() {
            component.amountSingular = 1;
            expect(component.acornPlural(component.amountSingular)).toEqual(component.amountSingular + " Acorn");
        });

        it('should check if amount of sent acorns is more than 1', function () {
            component.amountPlural = 2;
            expect(component.acornPlural(component.amountPlural)).toEqual(component.amountPlural + " Acorns");
        });
        
    });
});