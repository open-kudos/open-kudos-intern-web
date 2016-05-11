angular.module('myApp.components.giveChallenge', [])
    .component('kudosGiveChallenge', {
        templateUrl: 'app/components/kudos-give-challenge/kudos-give-challenge.html',
        controller: 'GiveChallengeController'
    })
    .controller('GiveChallengeController', function ($scope, $httpParamSerializer, Resources, Challenges, GiveChallengeService, $filter) {
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        $scope.userAvailableKudos = 0;

        $scope.clearChallengeFormValues = clearChallengeFormValues;
        $scope.challengeFormCheck = challengeFormCheck;
        $scope.giveChallenge = giveChallenge;
        $scope.showChallengeFormErrorMessage = showChallengeFormErrorMessage;

        function giveChallenge() {
            var expirationDate = $filter('date')($scope.giveChallengeExpirationDate, requestDateFormat);

            var giveTo = $httpParamSerializer({
                participant: $scope.giveChallengeTo,
                referee: $scope.giveChallengeReferee,
                name: $scope.giveChallengeName,
                description: $scope.giveChallengeDescription,
                finishDate: expirationDate,
                amount: $scope.giveChallengeAmountOfKudos
            });

            var challengeCall = challengeFormCheck();

            if (challengeCall)
                GiveChallengeService.create(giveTo).then(function (val) {
                    clearChallengeFormValues();
                    $('#giveChallengeModal').modal('hide');
                    toastr.success('You successfully challenged ' + val.data.participant + " with " + acornPlural(val.data.amount) + '.' +
                        ' Referee: ' + val.data.referee);
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getGivenChallenges().push(val.data);
                }).catch(function () {
                    showChallengeFormErrorMessage("Challenge receiver or referee does not exist");
                })
        }

        function challengeFormCheck() {
            if ($scope.giveChallengeName == null) {
                showChallengeFormErrorMessage("Please enter Challenge name");
                return false;
            } else if ($scope.giveChallengeAmountOfKudos == null) {
                showChallengeFormErrorMessage("Please enter valid challenge Acorns");
                return false;
            } else if ($scope.giveChallengeAmountOfKudos > $scope.userAvailableKudos) {
                showChallengeFormErrorMessage("You don't have enough of Acorns");
                return false;
            } else if ($scope.giveChallengeTo == null) {
                showChallengeFormErrorMessage("Please enter challenge receiver");
                return false;
            } else if ($scope.giveChallengeTo == $scope.userEmail) {
                showChallengeFormErrorMessage("You can't challenge yourself");
                return false;
            } else if ($scope.giveChallengeReferee == null) {
                showChallengeFormErrorMessage("Please enter challenge referee");
                return false;
            } else if ($scope.giveChallengeReferee == $scope.userEmail) {
                showChallengeFormErrorMessage("You can't be challenge referee");
                return false;
            } else if ($scope.giveChallengeTo == $scope.giveChallengeReferee) {
                showChallengeFormErrorMessage("Challenge receiver can't be challenge referee");
                return false;
            } else return true;
        }

        function clearChallengeFormValues() {
            $scope.giveChallengeTo = null;
            $scope.giveChallengeReferee = null;
            $scope.giveChallengeName = null;
            $scope.giveChallengeDescription = null;
            $scope.giveChallengeExpirationDate = null;
            $scope.giveChallengeAmountOfKudos = null;
        }

        function showChallengeFormErrorMessage(message) {
            $scope.errorClass = "error-message";
            $scope.challengeFormErrorMessage = message;
        }

        $scope.$watch(function () {
            return Resources.getUserAvailableKudos()
        }, function (newVal) {
            if (!isValid(newVal)) $scope.userAvailableKudos = Resources.getUserAvailableKudos();
        });

        function isValid(value) {
            return typeof value === "undefined";
        }

        function acornPlural(val){
            if (val > 1)
                return 'Acorns';
            else
                return 'Acorn';
        }
    });