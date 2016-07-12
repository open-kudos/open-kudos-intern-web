(function () {

    KudosNavbarController.$inject = ['$scope', '$location', '$window', '$cookies', 'Resources', 'ProfileService'];

    angular.module('myApp.components.navbar', [])
        .component('kudosNavbar', {
            templateUrl: 'app/components/kudos-navbar/kudos-navbar.html',
            controller: ('KudosNavbarController', KudosNavbarController),
            controllerAs: 'nav'
        });

    function KudosNavbarController($scope, $location, $window, $cookies, Resources, ProfileService) {
        var vm = this;

        vm.selectedHome = false;
        vm.selectedAcorns = false;
        vm.selectedFollowing = false;
        vm.selectedChallenges = false;
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
            }

            if (vm.user == undefined){
                ProfileService.userHome().then(function (user) {
                    Resources.setCurrentUser(user);
                    vm.user = Resources.getCurrentUser();
                });
            } else {
                vm.user = Resources.getCurrentUser();
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
            Resources.setCurrentUser(null);
            Resources.setCurrentUserEmail(null);
            ProfileService.logout().catch(function () {
                $window.location.href = "#/login";
            });
        }

        function clearCookies() {
            $cookies.put('remember_user', 'false');
            $cookies.put('user_credentials', '');
        }

    }
})();