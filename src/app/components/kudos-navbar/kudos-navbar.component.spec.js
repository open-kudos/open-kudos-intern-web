/**
 * Created by vytautassugintas on 07/06/16.
 */
"use strict";
describe('KudosNavbarComponent', function() {

    var $scope;
    var $controller;
    var $location;
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

    beforeEach(inject(function($rootScope, _$controller_, _$location_) {
        $scope = $rootScope.$new();
        $location = _$location_;

        $controller = _$controller_('KudosNavbarController', {
            $scope: $scope
        });

    }));

    describe('KudosNavbarController', function() {

        it('it should check #/profile location path', function() {
        //    $location.path() = '/profile';

        });



    });
});