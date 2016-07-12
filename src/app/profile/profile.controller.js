(function () {

    ProfileController.$inject = ['$scope', '$window', 'ProfileService', 'Resources', 'Utils'];

    angular
        .module('myApp.profile', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $window, ProfileService, Resources, Utils) {
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
            checkUser();

            ProfileService.userHome().then(function (val) {
                Resources.setCurrentUser(val);
                Resources.setCurrentUserEmail(val.email);
            });

            ProfileService.remainingKudos().then(function (val) {
                Resources.setUserAvailableKudos(val);
                vm.showLoaderUserAvailableKudos = false;
            });

            ProfileService.receivedKudos().then(function (val) {
                vm.userReceivedKudos = val;
                vm.showLoaderUserReceivedKudos = false;
            });
            
            if(Utils.isEmptyCollection(Resources.getUsersCollection())){
                ProfileService.listUsers().then(function (val) {
                    Resources.setUsersCollection(val.userList);
                    vm.usersCollection = Resources.getUsersCollection();
                });
            }
        }

        $scope.$watch(function () {
            return Resources.getUserAvailableKudos()
        }, function (newVal) {
            if (!isValid(newVal)) {
                vm.userAvailableKudos = Resources.getUserAvailableKudos();
            }
        });

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