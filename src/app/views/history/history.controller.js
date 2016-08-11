(function () {
    'use strict';
    angular
        .module('myApp.history', [
            'ngRoute'
        ])
        .controller('HistoryViewController', HistoryViewController);

    HistoryViewController.$inject = ['$routeParams', 'User', 'Utils'];

    function HistoryViewController($routeParams, UserService, Utils) {

        var vm = this;

        vm.params = $routeParams;
        vm.userActions = [];

        vm.formatDate = Utils.formatDate;
        vm.isSelectedUserEqualsCurrentUser = isSelectedUserEqualsCurrentUser;

        function activate() {
            vm.id = vm.params.userId;
            loadSelectedUser(vm.id);
            loadUserActions(vm.id, {page: 0, size: 10});
        }
        activate();

        function loadSelectedUser(id) {
            UserService.getUserProfile(id).then(function (userProfile) {
                vm.selectedUser = userProfile;
                vm.selectedUserEmail = userProfile.email;
                console.log(vm.selectedUserEmail);
            })
        }

        function loadUserActions(userId, pageParams) {
            UserService.getUserActions(userId, pageParams).then(function (actionsResponse) {
                vm.userActions = actionsResponse.content;
            })
        }

        function isSelectedUserEqualsCurrentUser() {
            return vm.id != UserService.getCurrentUser().id
        }
    }

})();