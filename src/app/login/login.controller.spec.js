/**
 * Created by vytautassugintas on 09/05/16.
 */
describe('Login Controller', function() {
    var ctrl, scope;

    beforeEach(module('myApp'));
    beforeEach(module('myApp.login'));

    var LoginService;

   // beforeEach( inject( function(_ProfileService_, _Challenges_, _Resources_){
   //     ProfileService = _ProfileService_;
   //     Challenges = _Challenges_;
   //     Resources = _Resources_;
   // }));

    beforeEach( inject([ function(_LoginService_){
        LoginService = _LoginService_;
    }]));

    it('Should call get samples on initialization', function() {

    });
});