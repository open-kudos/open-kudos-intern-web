(function () {

    var TopSendersController = function ($scope, ProfileService) {

        $scope.topSenders = [];
        $scope.acornPlural = acornPlural;

        ProfileService.getTopSenders().then(function(val) {
            $scope.topSenders = val;
        })

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopSendersController.$inject = ['$scope', 'ProfileService'];

    angular.module('myApp.components.topSenders', [])
        .component('kudosTopSenders', {
            templateUrl: 'app/components/kudos-top-senders/kudos-top-senders.html',
            controller: 'TopSendersController'
        })
        .controller('TopSendersController', TopSendersController)
})();