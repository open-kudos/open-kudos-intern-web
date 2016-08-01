(function () {
    angular
        .module('myApp.profile', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$window', 'ProfileService', 'Resources', 'Utils', 'User'];

    function ProfileController($scope, $window, ProfileService, Resources, Utils, UserService) {
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

        activate();

        function activate() {
            /*checkUser();*/

            UserService.getCurrentUserProfile().then(function (profileResponse){
                Resources.setCurrentUser(profileResponse);
                Resources.setCurrentUserEmail(profileResponse.email);
                Resources.setUserAvailableKudos(profileResponse.weeklyKudos);

                vm.userReceivedKudos = profileResponse.totalKudos;
                vm.userAvailableKudos = profileResponse.weeklyKudos;

                vm.showLoaderUserAvailableKudos = false;
                vm.showLoaderUserReceivedKudos = false;
            });

            if(Utils.isEmptyCollection(Resources.getUsersCollection())){
                ProfileService.listUsers().then(function (val) {
                    Resources.setUsersCollection(val.userList);
                    vm.usersCollection = Resources.getUsersCollection();
                });
            }
        }

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });
        }

        function isValid(value) {
            return typeof value === "undefined";
        }
    }
})();