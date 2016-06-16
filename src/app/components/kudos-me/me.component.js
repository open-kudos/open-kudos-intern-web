(function () {

    var MeController = function ($scope, $filter, $window, $timeout, $httpParamSerializer, MeService, Resources, ProfileService) {
        var self = this;
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        var currentDate = $filter('date')(new Date(), requestDateFormat);
        var user,
            requestData,
            checkUser,
            birthday,
            startedToWork;
        var fade = 4500;

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
        self.checkInputs = checkInputs;
        self.checkPattern = checkPattern;
        self.setValuesView = setValuesView;
        self.setValuesEdit = setValuesEdit;
        
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

        function edit() {
            self.showLoader = true;
            birthday = $filter('date')(self.birthdayEdit, requestDateFormat);
            startedToWork = $filter('date')(self.startedToWorkEdit, requestDateFormat);
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

            if (!checkInputs()) {
                MeService.edit(requestData).then(function (val) {
                    self.editMode = false;
                    toastr.success("You have successfully edited your profile");
                    setValuesView(val);
                    user = Resources.getCurrentUser();
                    checkIsCompleted(birthday, startedToWork, user);
                    self.showLoader = false;
                });
            } else {
                self.meErrorMessage = checkInputs();
                self.startFade = false;
                $timeout(function () {
                    self.startFade = true;
                    $timeout(function () {
                        self.meErrorMessage = "";
                        self.startFade = false;
                    }, 1000)
                }, fade);
                self.showLoader = false;
            }
        }

        function checkInputs() {
            if (self.firstNameEdit){
                if (self.firstNameEdit.length > 20) return "First name is too long";
                if (checkPattern(self.firstNameEdit)) return "In first name field only letters are allowed";
            } else return "First name can't be empty";

            if (self.lastNameEdit){
                if (self.lastNameEdit.length > 30) return "Last name is too long";
                if (checkPattern(self.lastNameEdit)) return "In last name field only letters are allowed";
            } else return "Last name can't be empty";

            if (birthday)
                if (birthday > currentDate) return "Your birthday cannot be in the future...";

            if (startedToWork)
                if (startedToWork > currentDate) return "You are already working here. Please change your started to work date";

            return false;
        }

        function checkPattern(val) {
            var reg = /[^ąčęėįšųūžĄČĘĖĮŠŲŪŽåäöÅÄÖĀĒĢĪĶĻŅēīāņļķģüÜÕõa-z A-Z]/;
            return !!reg.test(val);
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
            self.startedToWorkEdit = new Date(splitDate(self.startedToWork));
        }

        function checkIsCompleted(val1, val2, val) {
            if (val1 && val2) {
                val.completed = true;
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

    MeController.$inject = ['$scope', '$filter', '$window', '$timeout', '$httpParamSerializer', 'MeService', 'Resources', 'ProfileService'];

    angular.module('myApp.components.me', [])
        .component('kudosMe', {
            templateUrl: 'app/components/kudos-me/me.html',
            controller: 'MeController'
        })
        .controller('MeController', MeController)

})();