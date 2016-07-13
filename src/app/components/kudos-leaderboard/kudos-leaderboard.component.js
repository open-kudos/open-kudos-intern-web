(function () {
    LeaderboardController.$inject = ['ProfileService', 'Resources', '$httpParamSerializer'];

    angular
        .module('myApp.components.leaderboard', [])
        .component('kudosLeaderboard', {
            templateUrl: 'app/components/kudos-leaderboard/kudos-leaderboard.view.html',
            controller: ('LeaderboardController', LeaderboardController),
            controllerAs: 'leader'
        });

    function LeaderboardController(ProfileService, Resources, $httpParamSerializer) {
        var vm = this;

        vm.receivers = true;
        vm.criterion = 'All over period';
        vm.showLoader = true;
        vm.userReceivedKudos = 0;
        vm.topReceivers = [];
        vm.topSenders = [];
        
        vm.setAndUpdateTopSenders = setAndUpdateTopSenders;
        vm.setFilter = setFilter;
        vm.setAndUpdateTopReceivers = setAndUpdateTopReceivers;

        activate();

        function activate(){
            setAndUpdateTopReceivers('all');
            setAndUpdateTopSenders('all');
        }
        
        function setFilter(value) {
            if (value == 'all') {
                vm.criterion = 'All over period';
                setAndUpdateTopReceivers('all');
                setAndUpdateTopSenders('all');
            } else if (value == '7'){
                vm.criterion = 'Past 7 days';
                setAndUpdateTopReceivers('week');
                setAndUpdateTopSenders('week');
            } else if (value == '30'){
                setAndUpdateTopReceivers('month');
                setAndUpdateTopSenders('month');
                vm.criterion = 'Past 30 days';
            }
        }

        function setAndUpdateTopReceivers(param) {
            ProfileService.getTopReceivers(getRequestParams(param)).then(function(val) {
                Resources.setTopReceivers(val);
                vm.topReceivers = Resources.getTopReceivers();
                vm.showLoader = false;
            });
        }

        function setAndUpdateTopSenders(param) {
            ProfileService.getTopSenders(getRequestParams(param)).then(function(val) {
                Resources.setTopSenders(val);
                vm.topSenders = Resources.getTopSenders();
            });
        }

        function getRequestParams(param) {
            return $httpParamSerializer({
                period : param
            });
        }
    }
})();