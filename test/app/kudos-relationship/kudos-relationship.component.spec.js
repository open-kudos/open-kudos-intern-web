"use strict";
describe('RelationshipComponent', function () {

    var $scope;
    var $controller;
    var $httpBackend, serviceMock;
    var authRequestHandler;

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

    beforeEach(inject(function($rootScope, _$controller_) {
        $scope = $rootScope.$new();

        $controller = _$controller_('RelationshipController', {
            $scope: $scope
        });
    }));

    beforeEach(inject(function ($rootScope, _$controller_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $scope = $rootScope.$new();

        $controller = _$controller_('RelationshipController', {
            $scope: $scope
        });


        authRequestHandler = $httpBackend.when('POST', '/relations/add?test@test.test')
            .respond(testFollower);
    }));



    describe("RelationshipController", function () {

        it('should ensure that followed can be added to collection', function () {
            $scope.addFollowingToCollection(testFollower);
            expect($scope.followedCollection.length).toEqual(1);
        });

        it('should ensure that followed can be removed from collection', function () {
            $scope.removeFollowingFromCollection(1);
            expect($scope.followedCollection.length).toEqual(0);
        });

        it('should ensure that email can be transformed to data params', function () {
            expect($scope.transferDataToParam("test@test.lt")).toEqual("email=test@test.lt");
        });
        
    });

    describe("RelationService", function () {

        it('should fetch followers', function () {
            $scope.addFollowingToCollection(testFollower);
            expect($scope.followedCollection.length).toEqual(1);
        });

    })

});