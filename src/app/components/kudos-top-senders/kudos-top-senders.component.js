(function () {

    var TopSendersController = function ($scope, ProfileService, $httpParamSerializer) {
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

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopSendersController.$inject = ['$scope', 'ProfileService', '$httpParamSerializer'];

    angular.module('myApp.components.topSenders', [])
        .component('kudosTopSenders', {
            templateUrl: 'app/components/kudos-top-senders/kudos-top-senders.html',
            controller: 'TopSendersController'
        })
        .controller('TopSendersController', TopSendersController)
})();