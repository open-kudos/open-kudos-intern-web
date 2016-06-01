(function () {
    var GiveTeamChallengeController = function($scope, $timeout, $httpParamSerializer, Resources, Challenges, GiveChallengeService, GiveTeamChallengeService, $filter){
        $scope.team1 = [];
        $scope.team2 = [];
        $scope.autocompleteHide = true;
        var fade = 2000;

        activate();
        
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;

        function activate() {
            GiveChallengeService.listUsers().then(function (val) {
                $scope.usersCollection = val.userList;
            });
        }

        function addUser(val) {
            if(!checkUser($scope.teamChallengeParticipant)) {
                if (val == 1) {
                    $scope.team1.push($scope.teamChallengeParticipant);
                    $scope.teamChallengeParticipant = "";
                } else if (val == 2) {
                    $scope.team2.push($scope.teamChallengeParticipant);
                    $scope.teamChallengeParticipant = "";
                } else {
                    $scope.teamChallengeParticipant = "";
                }
            } else {
                $scope.teamErrorMessage = checkUser($scope.teamChallengeParticipant);
                $scope.startFade = false;
                $timeout(function () {
                    $scope.startFade = true;
                    $timeout(function () {
                        $scope.teamErrorMessage = "";
                        $scope.startFade = false;
                    }, 1000)
                }, fade);
            }
        }

        function removeUser(val){
            var i;
            for(i = 0; i < $scope.team1.length; i++) {
                if ($scope.team1[i] == val)
                    $scope.team1.splice(i, 1);
            }
            for (i = 0; i < $scope.team2.length; i++){
                if ($scope.team2[i] == val)
                    $scope.team2.splice(i, 1);
            }
        }

        function checkUser(val) {
            var i;
            for(i = 0; i < $scope.team1.length; i++) {
                if ($scope.team1[i] == val)
                    return "User is already in Team 1";
            }
            for (i = 0; i < $scope.team2.length; i++){
                if ($scope.team2[i] == val)
                    return "User is already in Team 2";
            }
            return false;
        }

        $scope.selectAutoText = function (text) {
            $scope.teamChallengeParticipant = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
        };

        $scope.$watch('teamChallengeParticipant', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    (newVal.length > 1) ? $scope.autocompleteHide = false : $scope.autocompleteHide = true;
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });
    };

    GiveTeamChallengeController.$inject = ['$scope', '$timeout', '$httpParamSerializer', 'Resources', 'Challenges', 'GiveChallengeService', 'GiveTeamChallengeService', '$filter'];

    angular.module('myApp.components.giveTeamChallenge', [])
        .component('kudosGiveTeamChallenge', {
            templateUrl: 'app/components/kudos-give-challenge-team/kudos-give-challenge-team.html',
            controller: 'GiveChallengeController'
        })
        .controller('GiveTeamChallengeController', GiveTeamChallengeController)

})();