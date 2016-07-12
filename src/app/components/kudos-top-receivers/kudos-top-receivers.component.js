(function () {

    TopReceiversController.$inject = ['ProfileService', '$httpParamSerializer', 'Resources'];

    angular
        .module('myApp.components.topReceivers', [])
        .component('kudosTopReceivers', {
            templateUrl: 'app/components/kudos-top-receivers/kudos-top-receivers.html',
            controller: ('TopReceiversController', TopReceiversController),
            controllerAs: 'receiver'
        });

    function TopReceiversController(ProfileService, $httpParamSerializer, Resources) {
        var vm = this;

        vm.showLoader = true;
        vm.userReceivedKudos = 0;
        vm.topReceivers = [];
        vm.setTopReceivers = setTopReceivers;

        activate();

        function activate(){
            setTopReceivers('all');
        }

        function setTopReceivers(criterion) {
            var requestData = $httpParamSerializer({
                period : criterion
            });
            ProfileService.getTopReceivers(requestData).then(function(val) {
                Resources.setTopReceivers(val);
                vm.topReceivers = Resources.getTopReceivers();
                vm.showLoader = false;
            });
        }
    }
})();