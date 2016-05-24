(function () {

    var MeController = function ($scope, $httpParamSerializer, User, Resources) {
        activate();
        
        var user;
        
        function activate() {

        }

        function userInformation(){
            user = Resources.getCurrentUser();
            if (user){
                console.log(user);
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $scope.birthday = user.birthday;
                $scope.startedToWork = user.startedToWorkDate;
                $scope.position = user.position;
                $scope.email = user.email;
            }
        }

        $scope.$watch(function () {
            userInformation();
        });
    };

    MeController.$inject = ['$scope', '$httpParamSerializer', 'User', 'Resources'];

    angular.module('myApp.components.me', [])
        .component('kudosMe', {
            templateUrl: 'app/components/kudos-me/me.html',
            controller: 'MeController'
        })
        .controller('MeController', MeController)

})();