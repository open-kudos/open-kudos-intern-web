(function () {

    var TopReceiversController = function ($scope, ProfileService, $httpParamSerializer, Resources) {
        $scope.showLoader = true;

        $scope.userReceivedKudos = 0;
        $scope.topReceivers = [];
        $scope.acornPlural = acornPlural;
        $scope.setTopReceivers = setTopReceivers;

        activate();

        function activate(){
            setTopReceivers('all');
        }

        $scope.$watch(function () {
            return Resources.getTopReceivers()
        }, function (newVal) {
            $scope.topReceivers = newVal;
        });

        function setTopReceivers(criterion) {
            var requestData = $httpParamSerializer({
                period : criterion
            });
            ProfileService.getTopReceivers(requestData).then(function(val) {
                Resources.setTopReceivers(val);
                $scope.showLoader = false;
            });
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopReceiversController.$inject = ['$scope', 'ProfileService', '$httpParamSerializer', 'Resources'];

    angular.module('myApp.components.topReceivers', [])
        .component('kudosTopReceivers', {
            templateUrl: 'app/components/kudos-top-receivers/kudos-top-receivers.html',
            controller: 'TopReceiversController'
        })
        .controller('TopReceiversController', TopReceiversController)
})();