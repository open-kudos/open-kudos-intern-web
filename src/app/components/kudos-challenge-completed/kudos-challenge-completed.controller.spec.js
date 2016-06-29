"use strict";
describe('CompletedChallengesController', function() {

    var $scope;
    var $controller;
    var someServiceMock;
    var controller;

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

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('Completed challenges controller', function() {
        beforeEach(inject(function($rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('CompletedChallengesController', { $scope: $scope });
        }));

        it('should check if show more button is being displayed', function() {
            var collectionOfMoreThanFiveElements = [1,2,3,4,5,6];
            $scope.showMoreButton(collectionOfMoreThanFiveElements);
            expect($scope.showMoreButton).toBeTruthy();
        });

        it('should check if show more button is being hidden', function() {
            var collectionOfLessThanFiveElements = [1];
            $scope.showMoreButton(collectionOfLessThanFiveElements);
            expect($scope.showMoreButton).toBeFalsy();
        });

        it('should check if amount of sent acorns equals to 1', function() {
            $scope.amountSingular = 1;
            expect($scope.acornPlural($scope.amountSingular)).toEqual($scope.amountSingular + " Acorn");
        });

        it('should check if amount of sent acorns is more than 1', function () {
            $scope.amountPlural = 2;
            expect($scope.acornPlural($scope.amountPlural)).toEqual($scope.amountPlural + " Acorns");
        });



    });
});