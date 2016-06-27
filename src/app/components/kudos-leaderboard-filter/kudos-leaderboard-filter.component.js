(function () {

    var LeaderboardFilterController = function ($scope, $controller) {
        var TopReceiversController = $scope.$new(),
            TopSendersController = $scope.$new();
        $controller('TopSendersController',{$scope : TopSendersController});
        $controller('TopReceiversController',{$scope : TopReceiversController});
        var self = this;
        
        self.criterion = 'All over period';
        
        self.setFilter = setFilter;

        function setFilter(value) {
            if (value == 'all') {
                self.criterion = 'All over period';
                TopReceiversController.setTopReceivers('all');
                TopSendersController.setTopSenders('all');
            } else if (value == '7'){
                self.criterion = 'Past 7 days';
                TopReceiversController.setTopReceivers('week');
                TopSendersController.setTopSenders('week');
            } else if (value == '30'){
                self.criterion = 'Past 30 days';
                TopReceiversController.setTopReceivers('month');
                TopSendersController.setTopSenders('month');
            }
        }
    };

    LeaderboardFilterController.$inject = ['$scope', '$controller'];

    angular.module('myApp.components.leaderboardFilter', [])
        .component('kudosLeaderboardFilter', {
            templateUrl: 'app/components/kudos-leaderboard-filter/kudos-leaderboard-filter.view.html',
            controller: 'LeaderboardFilterController',
            controllerAs: 'self'
        })
        .controller('LeaderboardFilterController', LeaderboardFilterController)
})();