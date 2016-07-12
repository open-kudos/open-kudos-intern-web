"use strict";
describe('RelationshipComponent', function () {

    var scope;
    var $componentController;
    var comp, serviceMock;

    var testFollower = {
        followerEmail: "test.test@test.lt",
        followerName: "Tester",
        followerSurname: "Test",
        id: "5746fcf2d4c61a6e8test70a",
        userEmail: "test.test@testr.lt",
        userName: "Tester",
        userSurname: "Test"
    };

    beforeEach(function () {
        serviceMock = jasmine.createSpyObj('RelationService', ['someAsyncCall']); // Example how to mock services
        module('myApp');
    });

    module("myApp", function ($provide) {
        $provide.provider("$translate", function () {
            this.$get = function (MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, _$componentController_, _$httpBackend_, _UserHistoryService_) {
        scope = $rootScope.$new();

        $componentController = _$componentController_;
        comp = $componentController('kudosRelationship',
            null,
            {controller: 'RelationshipController'}
        );
    }));



    describe("RelationshipController", function () {

        it('should ensure that followed can be added to collection', function () {
            comp.addFollowingToCollection(testFollower);
            expect(comp.followedCollection.length).toEqual(1);
        });

        it('should ensure that followed can be removed from collection', function () {
            comp.removeFollowingFromCollection(1);
            expect(comp.followedCollection.length).toEqual(0);
        });

        it('should ensure that email can be transformed to data params', function () {
            expect(comp.transferDataToParam("test@test.lt")).toEqual("email=test@test.lt");
        });
        
    });

    describe("RelationService", function () {

        it('should fetch followers', function () {
            comp.addFollowingToCollection(testFollower);
            expect(comp.followedCollection.length).toEqual(1);
        });

    })

});