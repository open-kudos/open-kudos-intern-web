(function () {
    'use strict';
    angular
        .module('myApp.acorn', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('AcornController', AcornController);

    AcornController.$inject = ['User'];

    function AcornController(User) {

        var vm = this;
        

        function activate() {
            vm.currentUser = User.getCurrentUser();
        }

        activate();

    }
})();