
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
        var requestData;
        $scope.getChallengeParticipatedList = getChallengeParticipatedList;
        $scope.acceptChallenge = acceptChallenge;
        $scope.declineChallenge = declineChallenge;

        getChallengeParticipatedList();

        function getChallengeParticipatedList() {
            var challengeStatus = "CREATED";
            requestData = $httpParamSerializer({
                status: challengeStatus
            });
            $scope.id = false;
            
            KudosChallengeParticipatedService.getList(requestData).then(function (val) {
                console.log(val[0]);
                if (val[0]) {
                    $scope.id = val[0].id;
                    $scope.challengeName = val[0].name;
                    $scope.challengeCreator = val[0].creator;
                    $scope.challengeDescription = val[0].description;
                    $scope.challengeFinishDate = val[0].finishDate;
                    $scope.challengeReferee = val[0].referee;
                }
            })
        }

        function acceptChallenge(id) {
            console.log(id);
        }

        function declineChallenge(id) {
            requestData = $httpParamSerializer({
                id: id
            });
            KudosChallengeParticipatedService.decline(requestData).then(function (val) {
                toastr.info('You declined ' + val.data.creator + ' challenge');
                getChallengeParticipatedList();
            })
        }
    });