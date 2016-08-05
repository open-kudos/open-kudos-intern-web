(function () {
    angular.module('myApp.components.navbar', [])
        .component('kudosNavbar', {
            templateUrl: 'app/components/kudos-navbar/kudos-navbar.html',
            controller: ('KudosNavbarController', KudosNavbarController),
            controllerAs: 'nav'
        });

    KudosNavbarController.$inject = ['$scope', '$location', '$window', '$cookies', 'User', 'Auth'];

    function KudosNavbarController($scope, $location, $window, $cookies, UserService, Auth) {
        var vm = this;

        vm.selectedHome = false;
        vm.selectedAcorns = false;
        vm.selectedFollowing = false;
        vm.selectedChallenges = false;
        vm.selectedShop = false;

        vm.logout = logout;
        vm.activate = activate;

        activate();

        function activate(){
            if ( $location.path() == '/profile'){
                vm.selectedHome = true;
            } else if ($location.path() == '/acorns'){
                vm.selectedAcorns = true;
            } else if ($location.path() == '/following'){
                vm.selectedFollowing = true;
            } else if ($location.path() == '/shop'){
                vm.selectedShop = true;
            }

            if(UserService.getCurrentUser() != null){
                vm.user = UserService.getCurrentUser();
            } else {
                UserService.getCurrentUserProfile().then(function (profileResponse){
                    vm.user = profileResponse;
                });
            }
        }

        $scope.$on('$locationChangeStart', function(event, newUrl, oldUrl) {
            var $openModalSelector = $(".modal.fade.in");
            if( ($openModalSelector.data('bs.modal') || {}).isShown == true){
                $openModalSelector.modal("hide");
                event.preventDefault();
            }
        });

        function logout() {
            clearCookies();
            UserService.setCurrentUser(null);
            Auth.logout().then(function () {
                $window.location.href = "#/login";
            });
        }

        function clearCookies() {
            $cookies.put('remember_user', 'false');
            $cookies.put('user_credentials', '');
        }

    }
})();