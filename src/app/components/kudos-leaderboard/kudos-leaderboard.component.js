(function () {
    angular
        .module('myApp.components.leaderboard', [])
        .component('kudosLeaderboard', {
            templateUrl: 'app/components/kudos-leaderboard/kudos-leaderboard.view.html',
            controller: ('LeaderboardController', LeaderboardController),
            controllerAs: 'leader'
        });

    LeaderboardController.$inject = ['ProfileService', 'Resources', '$httpParamSerializer', 'Leaderboard'];

    function LeaderboardController(ProfileService, Resources, $httpParamSerializer, Leaderboard) {
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
            setAndUpdateTopReceivers(999);
            setAndUpdateTopSenders(999);
        }
        
        function setFilter(value) {
            if (value == 'all') {
                vm.criterion = 'All over period';
                setAndUpdateTopReceivers(999);
                setAndUpdateTopSenders(999);
            } else if (value == '7'){
                vm.criterion = 'Past 7 days';
                setAndUpdateTopReceivers(7);
                setAndUpdateTopSenders(7);
            } else if (value == '30'){
                setAndUpdateTopReceivers(30);
                setAndUpdateTopSenders(30);
                vm.criterion = 'Past 30 days';
            }
        }

        function setAndUpdateTopReceivers(param) {
            Leaderboard.getTopReceivers(getRequestParams(param)).then(function(val) {
                Resources.setTopReceivers(val);
                vm.topReceivers = Resources.getTopReceivers();
                vm.showLoader = false;
            });
        }

        function setAndUpdateTopSenders(param) {
            Leaderboard.getTopSenders(getRequestParams(param)).then(function(val) {
                Resources.setTopSenders(val);
                vm.topSenders = Resources.getTopSenders();
            });
        }

        function getRequestParams(param) {
            return $httpParamSerializer({
                periodInDays : param
            });
        }
    }
})();