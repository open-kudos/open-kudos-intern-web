(function () {

    var MeController = function ($scope, $filter, $httpParamSerializer, MeService, Resources) {
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        var user, requestData, checkUser;

        $scope.edit = edit;
        $scope.splitDate = splitDate;

        function edit(){
            var firstName = $scope.firstName;
            var lastName = $scope.lastName;
            var birthday = $scope.birthday;
            var startedToWork = $scope.startedToWork;
            var position = $scope.position;

            birthday = $filter('date')(birthday, requestDateFormat);
            startedToWork = $filter('date')(startedToWork, requestDateFormat);

            requestData = $httpParamSerializer({
                email: $scope.email,
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                phone: null,
                startedToWorkDate: startedToWork,
                position: position,
                department: null,
                location: null,
                team: null
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
                $scope.birthday = splitDate(user.birthday);
                $scope.startedToWork = splitDate(user.startedToWorkDate);
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

        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
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