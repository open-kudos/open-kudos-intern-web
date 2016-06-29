(function () {
    LeaderboardFilterController.$inject = ['ProfileService', 'Resources', '$httpParamSerializer'];

    angular
        .module('myApp.components.leaderboardFilter', [])
        .component('kudosLeaderboardFilter', {
            templateUrl: 'app/components/kudos-leaderboard-filter/kudos-leaderboard-filter.view.html',
            controller: ('LeaderboardFilterController', LeaderboardFilterController),
            controllerAs: 'filter'
        });

    function LeaderboardFilterController(ProfileService, Resources, $httpParamSerializer) {
        var self = this;

        self.criterion = 'All over period';
        
        self.setFilter = setFilter;
        
        function setFilter(value) {
            if (value == 'all') {
                self.criterion = 'All over period';
                updateTopReceivers('all');
                updateTopSenders('all');
            } else if (value == '7'){
                self.criterion = 'Past 7 days';
                updateTopReceivers('week');
                updateTopSenders('week');
            } else if (value == '30'){
                updateTopReceivers('month');
                updateTopSenders('month');
                self.criterion = 'Past 30 days';
            }
        }
        
        function updateTopReceivers(param) {
            ProfileService.getTopReceivers(getRequestParams(param)).then(function (val) {
                Resources.setTopReceivers(val);
            });
        }

        function updateTopSenders(param) {
            ProfileService.getTopSenders(getRequestParams(param)).then(function (val) {
                Resources.setTopSenders(val);
            });
        }

        function getRequestParams(param) {
            return $httpParamSerializer({
                period : param
            });
        }
    }
})();