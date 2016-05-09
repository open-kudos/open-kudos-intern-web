/**
 * Created by vytautassugintas on 09/05/16.
 */
describe('Component Kudos Transaction Stream', function() {
    var ctrl, scope;
    var KudosTransactionService;

    beforeEach(function() {
        var httpMock = {
            get: jasmine.createSpy()
        };
        var SERVERMock = {
            "ip" : "http://127.0.0.1:8080"
        }
    });

    beforeEach(module('myApp.components.transactions'));
    beforeEach(module(function($provide) {
        $provide.constant("SERVER", {
            "ip": "http://127.0.0.1:8080"
        });
    }));

    

    beforeEach( inject([ function(_KudosTransactionService_){
        KudosTransactionService = _KudosTransactionService_;
    }]));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        //Create the controller with the new scope
        ctrl = $controller('KudosTransactionController', {
            $scope: scope,
            KudosTransactionService: KudosTransactionService
        });
    }));

    it('Should call get samples on initialization', function() {

    });
});