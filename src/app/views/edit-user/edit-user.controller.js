(function () {
    angular
        .module('myApp.edit-user', [])
        .controller('EditController', EditController);

    EditController.$inject = ['User', '$httpParamSerializer'];

    function EditController(UserService, $httpParamSerializer) {
        var vm = this;

        vm.user = null;

        vm.editUserProfile = editUserProfile;

        function activate() {
            vm.user = UserService.getCurrentUser();

            if (vm.user.startedToWorkDate != null)
                vm.user.startedToWorkDate = new Date(vm.user.startedToWorkDate);

            if (vm.user.birthday != null)
                vm.user.birthday = new Date(vm.user.birthday);

        }

        activate();

        function editUserProfile() {
            var requestBody = getUpdatedUser(vm.user);
            if (!validateDate(requestBody)) {
                UserService.updateUserProfile(requestBody).then(function (response) {
                    if (response.status == 200) {
                        toastr.success("Profile updated");
                        UserService.getCurrentUserProfile().then(function (response) {});
                    }
                }).catch(function (error) {
                    showError("It's impossible, wrong date");
                })
            }
        }

        function validateDate(requestBody) {
            if (isValidDate(requestBody.birthday)) {
                showError("It's impossible, wrong date");
            } else if (isValidDate(requestBody.startedToWork)) {
                showError("It's impossible, wrong date");
            } else {
                vm.errorMessage = "";
                vm.showError = false;
            }
        }

        function isValidDate(inputDate) {
            var date = new Date(inputDate);
            var today = new Date();
            if (date == "Invalid Date") {
                return false;
            } else if (date.getFullYear() < today.getFullYear() - 150 ) {
                return false;
            } else {
                return !date > today;
            }
        }

        function showError(errorMsg) {
            vm.errorMessage = errorMsg;
            vm.showError = true;
            return false;
        }

        function getUpdatedUser(user) {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                birthday: formatDate(user.birthday),
                startedToWork: formatDate(user.startedToWorkDate)
            };
        }

        function formatDate(commentDate) {
            var date = new Date(commentDate);
            return date.getFullYear() + "-" + formatDateNumber(date.getMonth()) + "-" + formatDateNumber(date.getDay());
        }

        function formatDateNumber(number) {
            return number < 10 ? '0' + number : number;
        }
    }
})();