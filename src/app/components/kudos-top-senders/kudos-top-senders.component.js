(function () {

    var TopSendersController = function ($scope, ProfileService, $httpParamSerializer, Resources) {
        $scope.topSenders = [];
        $scope.acornPlural = acornPlural;
        $scope.setTopSenders = setTopSenders;

        activate();

        function activate() {
            setTopSenders('all');
        }

        function setTopSenders(criterion) {
            var requestData = $httpParamSerializer({
                period : criterion
            });
            ProfileService.getTopSenders(requestData).then(function(val) {
                $scope.topSenders = val;
            });
        }

        $scope.$watch(function () {
            return Resources.getTopSenders();
        }, function (newVal) {
            $scope.topSenders = newVal;
        });

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopSendersController.$inject = ['$scope', 'ProfileService', '$httpParamSerializer', 'Resources'];

    angular.module('myApp.components.topSenders', [])
        .component('kudosTopSenders', {
            templateUrl: 'app/components/kudos-top-senders/kudos-top-senders.html',
            controller: 'TopSendersController'
        })
        .controller('TopSendersController', TopSendersController)
})();