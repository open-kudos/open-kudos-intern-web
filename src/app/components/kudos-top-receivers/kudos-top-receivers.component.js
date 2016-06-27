(function () {

    var TopReceiversController = function ($scope, ProfileService, $httpParamSerializer) {
        $scope.showLoader = true;

        $scope.userReceivedKudos = 0;
        $scope.topReceivers = [];
        $scope.acornPlural = acornPlural;
        $scope.setTopReceivers = setTopReceivers;

        activate();

        function activate(){
            setTopReceivers('all');
        }

        function setTopReceivers(criterion) {
            var requestData = $httpParamSerializer({
                period : criterion
            });
            ProfileService.getTopReceivers(requestData).then(function(val) {
                $scope.topReceivers = val;
                $scope.showLoader = false;
            });
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopReceiversController.$inject = ['$scope', 'ProfileService', '$httpParamSerializer'];

    angular.module('myApp.components.topReceivers', [])
        .component('kudosTopReceivers', {
            templateUrl: 'app/components/kudos-top-receivers/kudos-top-receivers.html',
            controller: 'TopReceiversController'
        })
        .controller('TopReceiversController', TopReceiversController)
})();