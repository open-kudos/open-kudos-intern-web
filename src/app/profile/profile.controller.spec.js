angular.module('myApp', [])
    .controller('MyCtrl', ['$scope', function MyCtrl($scope) {
        $scope.greeting = "hello";
    }]);

describe('Main Controller', function() {

    beforeEach(module('myApp'));
    beforeEach(module('myApp.profile'));

    var checkUserMock

    ;

    var ctrl, scope;

    var ProfileService;
    var Challenges;
    var Resources;

    beforeEach( inject( [function(_ProfileService_, _Challenges_, _Resources_){
        ProfileService = _ProfileService_;
        Challenges = _Challenges_;
        Resources = _Resources_;
    }]));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();

        //Create the controller with the new scope
        ctrl = $controller('ProfileController', {
            $scope: scope,
            ProfileService: ProfileService,
            Challenges: Challenges,
            Resources: Resources
        });
    }));



    it('Should call get samples on initialization', function() {
        expect(scope.greeting).toEqual('hello');
    });
});
