(function () {
    'use strict';
    angular
        .module('myApp.history', [
            'ngRoute'
        ])
        .controller('HistoryViewController', HistoryViewController);

    HistoryViewController.$inject = ['$routeParams'];

    function HistoryViewController($routeParams) {

        var vm = this;

        vm.params = $routeParams;

        function activate() {
            vm.id = vm.params.userId;
        }
        activate();

    }

})();