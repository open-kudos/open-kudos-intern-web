(function () {

    TopSendersController.$inject = ['ProfileService', '$httpParamSerializer', 'Resources'];

    angular.module('myApp.components.topSenders', [])
        .component('kudosTopSenders', {
            templateUrl: 'app/components/kudos-top-senders/kudos-top-senders.html',
            controller: ('TopSendersController', TopSendersController),
            controllerAs: 'sender'
        });

    function TopSendersController(ProfileService, $httpParamSerializer, Resources) {
        var vm = this;

        vm.topSenders = [];
        vm.setTopSenders = setTopSenders;

        activate();

        function activate() {
            setTopSenders('all');
        }

        function setTopSenders(criterion) {
            var requestData = $httpParamSerializer({
                period : criterion
            });
            ProfileService.getTopSenders(requestData).then(function(val) {
                Resources.setTopSenders(val);
                vm.topSenders = Resources.getTopSenders();
            });
        }
    }
})();