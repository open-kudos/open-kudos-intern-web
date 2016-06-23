(function () {

    var TopReceiversController = function ($scope, ProfileService) {
        $scope.showLoader = true;

        $scope.userReceivedKudos = 0;
        $scope.topReceivers = [];
        $scope.acornPlural = acornPlural;

        ProfileService.getTopReceivers().then(function(val) {
            $scope.topReceivers = val;
            $scope.showLoader = false;
        });

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }
    };

    TopReceiversController.$inject = ['$scope', 'ProfileService'];

    angular.module('myApp.components.topReceivers', [])
        .component('kudosTopReceivers', {
            templateUrl: 'app/components/kudos-top-receivers/kudos-top-receivers.html',
            controller: 'TopReceiversController'
        })
        .controller('TopReceiversController', TopReceiversController)
})();