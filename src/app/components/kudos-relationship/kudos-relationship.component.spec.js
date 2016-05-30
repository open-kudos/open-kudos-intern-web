/**
 * Created by vytautassugintas on 30/05/16.
 */

"use strict";
describe('RelationshipComponent', function() {

    var $scope;
    var serviceMock;
    var $controller;

    var testFollower = {
        followerEmail: "gilius.giliukas@swedbank.lt",
        followerName: "Gilius",
        followerSurname: "Giliukas",
        id: "5746fcf2d4c61a6e8bbab70a",
        userEmail: "vytautas.sugintas@swedbank.lt",
        userName: "Vytautas",
        userSurname: "Sugintas"
    };

    beforeEach(function (){
        serviceMock = jasmine.createSpyObj('someService', ['someAsyncCall']); // Example how to mock services
        module('myApp');
    });

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function(_$controller_) {
        $scope = {};
        $controller = _$controller_('RelationshipController', { $scope: $scope });
    }));

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