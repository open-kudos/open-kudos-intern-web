(function () {
    angular
        .module('myApp.profile', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'User', 'Utils'];

    function HomeController($scope, UserService, Utils) {
        var vm = this;

        vm.showLoaderUserAvailableKudos = true;
        vm.showLoaderUserReceivedKudos = true;

        vm.userAvailableKudos = 0;
        vm.userReceivedKudos = 0;

        vm.usersCollection = [];
        vm.topReceivers = [];
        vm.buttonDisabled = true;
        vm.receivedAcorns = false;
        vm.sentAcorns = true;
        vm.giveAcorns = false;
        vm.newChallengeTab = true;
        vm.showDropDown = false;

        vm.receiverErrorClass = "";
        vm.receiverErrorMessage = "";
        vm.amountErrorClass = "";
        vm.amountErrorMessage = "";

        vm.isValid = isValid;
        vm.isNotMobile = Utils.isNotMobile;

        activate();
        
        function activate() {
            getCurrentUserData(UserService.getCurrentUser());
        }

        $scope.$watch(function(){
            return UserService.getCurrentUser().weeklyKudos;
        }, function (kudos) {
            vm.userAvailableKudos = kudos;
        });

        function getCurrentUserData(user) {
            vm.userReceivedKudos = user.totalKudos;
            vm.userAvailableKudos = user.weeklyKudos;
            vm.showLoaderUserAvailableKudos = false;
            vm.showLoaderUserReceivedKudos = false;
        }

        function isValid(value) {
            return typeof value === "undefined";
        }
    }
})();