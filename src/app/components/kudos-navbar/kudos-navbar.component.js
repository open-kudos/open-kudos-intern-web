/**
 * Created by vytautassugintas on 12/05/16.
 */
(function () {
    
    function KudosNavbarController($scope, $location, Resources) {

        $scope.selectedHome = false;
        $scope.selectedAcorns = false;
        $scope.selectedChallenges = false;
        $scope.user = Resources.getCurrentUser();

        function activate(){
            if ( $location.path() == '/profile'){
                $scope.selectedHome = true;
            } else if ( $location.path() == '/acorns'){
                $scope.selectedAcorns = true;
            } else if ( $location.path() == '/challenges'){
                $scope.selectedChallenges = true;
            }
        }

        activate();


    }

    KudosNavbarController.$inject = ['$scope', '$location', 'Resources'];

    angular.module('myApp.components.navbar', [])
        .component('kudosNavbar', {
            templateUrl: 'app/components/kudos-navbar/kudos-navbar.html',
            controller: 'KudosNavbarController'
        })
        .controller('KudosNavbarController', KudosNavbarController)

})();