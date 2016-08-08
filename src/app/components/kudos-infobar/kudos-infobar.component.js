(function () {
    angular.module('myApp.components.info', [])
        .component('kudosInfo', {
            templateUrl: 'app/components/kudos-infobar/kudos-infobar.html',
            controller: ('InfoController', InfoController),
            controllerAs: 'info'
        });

    InfoController.$inject = ['$scope', 'User'];

    function InfoController($scope, User) {
        var vm = this,
            checkUser;
        
        function checkUserCompleted(){
            var user = User.getCurrentUser();
            if (user && !checkUser){
                checkUser = true;
                vm.isCompleted = user.completed;
            }
        }

        $scope.$watch(function () {
            checkUserCompleted();
        });
    }
})();