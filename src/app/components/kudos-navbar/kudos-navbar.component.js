/**
 * Created by vytautassugintas on 12/05/16.
 */
(function () {
    
    function KudosNavbarController($scope, $location, $window, $cookies, Resources, ProfileService) {

        $scope.selectedHome = false;
        $scope.selectedAcorns = false;
        $scope.selectedChallenges = false;
        $scope.user = Resources.getCurrentUser();
        $scope.checkUserLength = checkUserLength;

        $scope.logout = logout;

        function activate(){
            if ( $location.path() == '/profile'){
                $scope.selectedHome = true;
            } else if ( $location.path() == '/acorns'){
                $scope.selectedAcorns = true;
            }
        }
        activate();

        $scope.$watch(function () {
            return $scope.user = Resources.getCurrentUser()
        });

        function logout() {
            clearCookies();
            ProfileService.logout().catch(function () {
                $window.location.href = "#/login";
            });
        }

        function clearCookies() {
            $cookies.put('remember_user', 'false');
            $cookies.put('user_credentials', '');
        }

        function checkUserLength(user) {
            if (user != undefined){
                return user.firstName.length > 9 || user.lastName.length > 9;
            }
        }

    }

    KudosNavbarController.$inject = ['$scope', '$location', '$window', '$cookies', 'Resources', 'ProfileService'];

    angular.module('myApp.components.navbar', [])
        .component('kudosNavbar', {
            templateUrl: 'app/components/kudos-navbar/kudos-navbar.html',
            controller: 'KudosNavbarController'
        })
        .controller('KudosNavbarController', KudosNavbarController)

})();