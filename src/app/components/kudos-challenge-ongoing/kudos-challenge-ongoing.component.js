(function () {
    angular.module('myApp.components.challengeOngoing', [])

        .directive('kudosChallengeOngoing', function () {
            return {
                controller: 'KudosChallengeOngoingController',
                restrict: 'E',
                scope: false,
                templateUrl: 'app/components/kudos-challenge-ongoing/kudos-challenge-ongoing.html'
            }
        })

        .controller('KudosChallengeOngoingController', function ($httpParamSerializer, $scope, KudosChallengeOngoingService) {
            
        });
})();