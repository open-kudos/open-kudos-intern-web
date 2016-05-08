/**
 * Created by vytautassugintas on 06/05/16.
 */
describe('profile', function () {

    beforeEach(function(){
        module('myApp');
    });

    beforeEach(module('myApp.profile'));

    it('should ....', inject(function($controller) {
        //spec body
        var scope = {};
        var ProfileController = $controller('profileController', { $scope: scope });
        expect(ProfileController).toBeDefined();
    }));

});