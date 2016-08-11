(function () {
    angular
        .module('myApp.components.feed.challenge', [])
        .component('kudosFeedChallenge', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-feed-challenge/feed-challenge.html',
            bindings: {
                action: '=',
                index: '='
            },
            controller: ('ChallengeFeedController', ChallengeFeedController),
            controllerAs: 'challenge'
        });

    ChallengeFeedController.$inject = ['Utils'];

    function ChallengeFeedController(Utils) {
        var vm = this;
        vm.loadComments = false;

        vm.formatDate = Utils.formatDate;
        vm.acornPlural = Utils.acornPlural;

        vm.$onInit = onInit();

        function onInit() {
            checkActionType(vm.action.type);
        }

        function checkActionType(type) {
            switch (type) {
                case 'CREATED_CHALLENGE' :
                    vm.for = true;
                    vm.fromForText = "for";
                    vm.challengeTypeText = "created a new";
                    break;
                case 'CANCELED_CHALLENGE' :
                    vm.for = true;
                    vm.fromForText = "for";
                    vm.challengeTypeText = "canceled";
                    break;
                case 'DECLINED_CHALLENGE' :
                    vm.from = true;
                    vm.fromForText = "from";
                    vm.challengeTypeText = "declined";
                    break;
                case 'ACCEPTED_CHALLENGE' :
                    vm.from = true;
                    vm.fromForText = "from";
                    vm.challengeTypeText = "accepted";
                    break;
                case 'FAILED_CHALLENGE' :
                    vm.from = true;
                    vm.fromForText = "from";
                    vm.challengeTypeText = "failed";
                    break;
                case 'MARKED_AS_COMPLETED' :
                    vm.for = true;
                    vm.fromForText = "for";
                    vm.challengeTypeText = "marked as completed";
                    break;
                case 'MARKED_AS_FAILED' :
                    vm.for = true;
                    vm.fromForText = "for";
                    vm.challengeTypeText = "marked as failed";
                    break;
                case 'ACCOMPLISHED_CHALLENGE' :
                    vm.from = true;
                    vm.challengeTypeText = "accomplished";
                    vm.fromForText = "from";
                    break;
                default:
                    vm.hidePanel = true;
            }
        }

    }
})();