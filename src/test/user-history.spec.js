"use strict";
describe('User history', function() {
    var scope = null;
    var ctrl = null;
    var httpParamSerializer,
        $httpBackend;

    beforeEach(module('myApp'));

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $httpParamSerializer) {
        scope = $rootScope.$new();

        ctrl = $controller('UserHistoryController', {
            $scope: scope
        });

        httpParamSerializer = $httpParamSerializer;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'app/translations/locale-en.json').respond();
        $httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('Controller', function() {

        it('', function () {

        });

    });
});