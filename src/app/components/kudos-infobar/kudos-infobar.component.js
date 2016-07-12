(function () {

    InfoController.$inject = ['$scope', 'Resources'];

    angular.module('myApp.components.info', [])
        .component('kudosInfo', {
            templateUrl: 'app/components/kudos-infobar/kudos-infobar.html',
            controller: ('InfoController', InfoController),
            controllerAs: 'info'
        });

    function InfoController($scope, Resources) {
        var vm = this,
            checkUser;
        
        function checkUserCompleted(){
            var user = Resources.getCurrentUser();
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