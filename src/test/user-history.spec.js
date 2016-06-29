"use strict";
describe('User history', function() {
    var scope = null,
        $componentController,
        comp,
        serv,
        ip,
        requestData,
        httpParamSerializer,
        httpBackend;

    beforeEach(module('myApp'));

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, _$componentController_, _$httpBackend_, _UserHistoryService_, $httpParamSerializer, SERVER) {
        scope = $rootScope.$new();

        serv = _UserHistoryService_;
        $componentController = _$componentController_;

        comp = $componentController('kudosUserHistory',
            null,
            {controller: 'UserHistoryController'}
        );

        ip = SERVER.ip;

        httpParamSerializer = $httpParamSerializer;
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', 'app/translations/locale-en.json').respond();
        httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('Service', function() {

        it('should update list for "all" tab transactions', function () {
            requestData = {
                email: 'test.test@swedbank.lt',
                start: 0,
                end: 5
            };

            httpBackend.whenGET(ip + "/history/all?endingIndex=5&startingIndex=0&userEmail=test.test@swedbank.lt").respond({
                email: 'test.test',
                end: '5000'
            });

            serv.getAllTransactions(requestData).then(function (val) {
                expect(val.email).toEqual('test.test');
                expect(val.end).toEqual('5000');
            });

            httpBackend.flush();
        });

    });
});