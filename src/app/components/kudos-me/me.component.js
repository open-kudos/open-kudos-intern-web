(function () {

    var MeController = function ($scope, $filter, $httpParamSerializer, MeService, Resources) {
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        var user, requestData, checkUser;

        $scope.followersCount = 0;
        $scope.followingCount = 0;

        $scope.edit = edit;
        $scope.splitDate = splitDate;

        function activate() {
            MeService.followers().then(function (val) {
                $scope.followersCount = val.data.length;
            });

            MeService.following().then(function (val) {
                $scope.followingCount = val.data.length;
            });
        }

        activate();

        function edit(){
            var firstName = $scope.firstName;
            var lastName = $scope.lastName;
            var department = $scope.department;
            var team = $scope.team;
            var birthday = $filter('date')($scope.birthday, requestDateFormat);
            var startedToWork = $filter('date')($scope.startedToWork, requestDateFormat);
            var phone = $scope.phone;
            var position = $scope.position;

            if (birthday == 'Invalid Date')
                birthday = null;

            if (startedToWork == 'Invalid Date')
                startedToWork = null;

            requestData = $httpParamSerializer({
                email: $scope.email,
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
            })
        }

        function userInformation(){
            user = Resources.getCurrentUser();
            if (user && !checkUser){
                checkUser = true;
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $scope.department = user.department;
                $scope.team = user.team;
                $scope.birthday = new Date(splitDate(user.birthday));
                $scope.startedToWork = new Date(splitDate(user.startedToWorkDate));
                $scope.phone = user.phone;
                $scope.position = user.position;
                $scope.email = user.email;
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