
angular.module('myApp.components', [])

    .directive('kudosChallengeParticipated', function () {
        return {
            controller: 'KudosChallengeParticipatedController',
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/kudos-challenge-participated/kudos-challenge-participated.html'
        }
    })

    .controller('KudosChallengeParticipatedController', function ($scope) {
        $scope.testujit = 'a';
    });