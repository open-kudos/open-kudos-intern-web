(function () {

    var MeController = function ($scope, $filter, $httpParamSerializer, MeService, Resources) {
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        var user, requestData, checkUser;
        var self = this;

        self.followersCount = 0;
        self.followingCount = 0;
        self.isMeActive = true;
        self.isFriendsActive = false;

        self.edit = edit;
        self.splitDate = splitDate;
        self.checkIsCompleted = checkIsCompleted;
        
        function activate() {
            MeService.followers().then(function (val) {
                self.followersCount = val.data.length;
            });

            MeService.following().then(function (val) {
                self.followingCount = val.data.length;
            });
        }

        activate();

        function edit(){
            var firstName = self.firstName;
            var lastName = self.lastName;
            var department = self.department;
            var team = self.team;
            var birthday = $filter('date')(self.birthday, requestDateFormat);
            var startedToWork = $filter('date')(self.startedToWork, requestDateFormat);
            var phone = self.phone;
            var position = self.position;

            if (birthday == 'Invalid Date')
                birthday = null;

            if (startedToWork == 'Invalid Date')
                startedToWork = null;

            requestData = $httpParamSerializer({
                email: self.email,
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                phone: phone,
                startedToWorkDate: startedToWork,
                position: position,
                department: department,
                location: null,
                team: team
            });

            MeService.edit(requestData).then(function (val) {
                toastr.success("You have successfully edited your profile");
                user = Resources.getCurrentUser();
                checkIsCompleted(birthday, startedToWork, user);
            })
        }

        function userInformation(){
            user = Resources.getCurrentUser();
            if (user && !checkUser){
                checkUser = true;
                self.firstName = user.firstName;
                self.lastName = user.lastName;
                self.department = user.department;
                self.team = user.team;
                self.birthday = new Date(splitDate(user.birthday));
                self.startedToWork = new Date(splitDate(user.startedToWorkDate));
                self.phone = user.phone;
                self.position = user.position;
                self.email = user.email;
            }
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

    MeController.$inject = ['$scope', '$filter', '$httpParamSerializer', 'MeService', 'Resources'];

    angular.module('myApp.components.me', [])
        .component('kudosMe', {
            templateUrl: 'app/components/kudos-me/me.html',
            controller: 'MeController'
        })
        .controller('MeController', MeController)

})();