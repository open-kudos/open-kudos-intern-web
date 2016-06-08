(function () {

    var MeController = function ($scope, $filter, $window, $httpParamSerializer, MeService, Resources, ProfileService) {
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        var user, requestData, checkUser;
        var self = this;

        activate();

        self.followersCount = 0;
        self.followingCount = 0;
        self.isMeActive = true;
        self.isFriendsActive = false;
        self.showLoader = true;

        self.edit = edit;
        self.splitDate = splitDate;
        self.checkIsCompleted = checkIsCompleted;
        self.editAsView = editAsView;
        
        function activate() {
            isLoggedIn();

            MeService.followers().then(function (val) {
                self.followersCount = val.data.length;
            });

            MeService.following().then(function (val) {
                self.followingCount = val.data.length;
                self.showLoader = false;
            });
        }

        function isLoggedIn() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/me" : $window.location.href = "#/login";
            });
        }

        function edit(){
            var birthday = $filter('date')(self.birthdayEdit, requestDateFormat);
            var startedToWork = $filter('date')(self.startedToWorkEdit, requestDateFormat);
            self.birthdayView = $filter('date')(self.birthdayEdit, requestDateFormat);
            self.startedToWorkView = $filter('date')(self.startedToWorkEdit, requestDateFormat);

            if (birthday == 'Invalid Date') {
                birthday = null;
                self.birthdayView = null;
            }

            if (startedToWork == 'Invalid Date') {
                startedToWork = null;
                self.startedToWorkView = null;
            }

            requestData = $httpParamSerializer({
                email: self.email,
                firstName: self.firstNameEdit,
                lastName: self.lastNameEdit,
                birthday: birthday,
                startedToWorkDate: startedToWork
            });

            MeService.edit(requestData).then(function (val) {
                toastr.success("You have successfully edited your profile");
                setValuesView(val);
                user = Resources.getCurrentUser();
                checkIsCompleted(birthday, startedToWork, user);
            })
        }

        function userInformation(){
            user = Resources.getCurrentUser();
            if (user && !checkUser){
                checkUser = true;
                setValuesEdit(user);
                setValuesView(user);
                self.email = user.email;
            }
        }

        function setValuesView(val) {
            self.firstName = val.firstName;
            self.lastName = val.lastName;
            self.birthday = val.birthday;
            self.startedToWork = val.startedToWorkDate;
        }

        function setValuesEdit(val) {
            self.firstNameEdit = val.firstName;
            self.lastNameEdit = val.lastName;
            self.birthdayEdit = new Date(splitDate(val.birthday));
            self.startedToWorkEdit = new Date(splitDate(val.startedToWorkDate));
        }

        function editAsView() {
            self.firstNameEdit = self.firstName;
            self.lastNameEdit = self.lastName;
            self.birthdayEdit = new Date(splitDate(self.birthday));
            self.startedToWorkEdit = new Date(splitDate(self.startedToWorkDate));
        }

        function checkIsCompleted(val1, val2) {
            if (val1 && val2) {
                user.completed = true;
                Resources.setCurrentUser(user);
            }
        } 

        function splitDate(val){
            if (val) {
                val = val.split(" ");
                return val[0];
            }
        }

        $scope.$watch(function () {
            userInformation();
        });
    };

    MeController.$inject = ['$scope', '$filter', '$window', '$httpParamSerializer', 'MeService', 'Resources', 'ProfileService'];

    angular.module('myApp.components.me', [])
        .component('kudosMe', {
            templateUrl: 'app/components/kudos-me/me.html',
            controller: 'MeController'
        })
        .controller('MeController', MeController)

})();