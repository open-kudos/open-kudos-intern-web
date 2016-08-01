(function () {
    angular
        .module('myApp.components.challenges-panel', [])
        .component('kudosChallengesPanel', {
            templateUrl: 'app/components/kudos-challenges/kudos-challenges-panel/kudos-challenges-panel.html',
            controller: ('ChallengesPanelController', ChallengesPanelController),
            controllerAs: 'panel'
        });

    ChallengesPanelController.$inject = ['$scope', 'ChallengesPanelService'];

    function ChallengesPanelController($scope, ChallengesPanelService) {
        var vm = this;

        vm.newChallengeTab = true;

        vm.newChallengesAmount = 0;
        vm.ongoingChallengesAmount = 0;
        vm.completedChallengesAmount = 0;
        
        vm.$onInit = onInit();

        function onInit() {

        }

        $scope.$watch(function(){
            return ChallengesPanelService.getNewChallengesAmount();
        }, function (amount) {
            vm.newChallengesAmount = amount;
        });

        $scope.$watch(function(){
            return ChallengesPanelService.getOngoingChallengesAmount();
        }, function (amount) {
            vm.ongoingChallengesAmount = amount;
        });

        $scope.$watch(function(){
            return ChallengesPanelService.getCompletedChallengesAmount();
        }, function (amount) {
            vm.completedChallengesAmount = amount;
        });

    }
})();