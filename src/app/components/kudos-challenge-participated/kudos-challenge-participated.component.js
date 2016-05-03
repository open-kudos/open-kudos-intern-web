
angular.module('myApp.components.challengeParticipated', [])

    .directive('kudosChallengeParticipated', function () {
        return {
            controller: 'KudosChallengeParticipatedController',
            restrict: 'E',
            scope: false,
            templateUrl: 'app/components/kudos-challenge-participated/kudos-challenge-participated.html'
        }
    })

    .controller('KudosChallengeParticipatedController', function ($httpParamSerializer, $scope, KudosChallengeParticipatedService) {
        var challengeStatus = "CREATED";
        var requestData = $httpParamSerializer({
            status: challengeStatus
        });
        
        $scope.getChallengeParticipatedList = getChallengeParticipatedList;
        $scope.acceptChallenge = acceptChallenge;

        getChallengeParticipatedList(requestData);

        function getChallengeParticipatedList(requestData) {
            KudosChallengeParticipatedService.getList(requestData).then(function (val) {
                console.log(val[0]);
                $scope.challengeName = val[0].name;
                $scope.challengeCreator = val[0].creator;
                $scope.challengeDescription = val[0].description;
                $scope.challengeFinishDate = val[0].finishDate;
                $scope.challengeReferee = val[0].referee;
            })
        }

        function acceptChallenge(id) {
            console.log(id);
        }
    });