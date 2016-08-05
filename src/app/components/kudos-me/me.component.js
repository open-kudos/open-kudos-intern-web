(function () {
    angular
        .module('myApp.components.me', [])
        .component('kudosMe', {
            templateUrl: 'app/components/kudos-me/me.html',
            controller: ('MeController', MeController),
            controllerAs: 'me'
        });

    MeController.$inject = ['User'];

    function MeController(UserService) {
        var vm = this;

        vm.user = null;

        vm.$onInit = onInit();

        function onInit() {
            vm.user = UserService.getCurrentUser();
        }

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });

    }

})();