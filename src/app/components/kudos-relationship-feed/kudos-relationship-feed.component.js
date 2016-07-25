(function () {

    angular
        .module('myApp.components.relationship.feed', [])
        .component('kudosRelationshipFeed', {
            templateUrl: 'app/components/kudos-relationship-feed/kudos-relationship-feed.html',
            controller: ('RelationshipFeedController', RelationshipFeedController),
            controllerAs: 'feedCtrl'
        });

    RelationshipFeedController.$inject = ['$httpParamSerializer', 'Utils', 'Resources', 'Relation', 'User'];

    function RelationshipFeedController($httpParamSerializer, Utils, Resources, Relation, User) {
        var vm = this;

        vm.FollowedUsersFeed = [];
        vm.currentUser = null;

        vm.generateSenderName = generateSenderName;
        vm.generateReceiverName = generateReceiverName;
        vm.generateReceivedWonLostText = generateReceivedWonLostText;
        vm.generateFromAgainstText = generateFromAgainstText;
        vm.acornPlural = Utils.acornPlural;
        vm.splitDate = Utils.trimDate;

        vm.$onInit = onInit();

        function onInit() {
            User.home().then(function (user) {
                vm.currentUser = user;
                Resources.setCurrentUser(user);
            });

            Relation.feed(requestData(0, 5)).then(function (feed) {
                vm.FollowedUsersFeed = feed;
            });
        }

        function generateSenderName(feed) {
            return feed.senderEmail === vm.currentUser.email ? "You" : feed.senderFullName;
        }

        function generateReceiverName(feed) {
            return feed.receiverEmail === vm.currentUser.email ? "You" : feed.receiverFullName;
        }

        function generateFromAgainstText(feed) {
            return feed.status !== 'COMPLETED' ? 'against' : 'from';
        }

        function generateReceivedWonLostText(feed) {
            if (feed.status === 'COMPLETED_CHALLENGE_PARTICIPANT') {
                return "won";
            } else if (feed.status === 'COMPLETED_CHALLENGE_CREATOR') {
                return "lost";
            } else {
                return "received";
            }
        }

        function requestData(start, end) {
            return $httpParamSerializer({
                startIndex: start,
                endIndex: end
            })
        }


    }
})();