(function () {

    var InfoController = function ($scope, Resources) {
        var checkUser;
        
        function checkUserCompleted(){
            var user = Resources.getCurrentUser();
            if (user && !checkUser){
                checkUser = true;
                $scope.isCompleted = user.completed;
            }
        }

        $scope.$watch(function () {
            checkUserCompleted();
        });
    };

    InfoController.$inject = ['$scope', 'Resources'];

    angular.module('myApp.components.info', [])
        .component('kudosInfo', {
            templateUrl: 'app/components/kudos-infobar/kudos-infobar.html',
            controller: 'InfoController'
        })
        .controller('InfoController', InfoController)

})();