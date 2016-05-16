(function () {
    var GiveChallengeController = function($scope, $httpParamSerializer, Resources, Challenges, GiveChallengeService, $filter){
        var requestDateFormat = 'yyyy-MM-dd HH:mm:ss,sss';
        $scope.userAvailableKudos = 0;
        $scope.autocompleteHide = true;

        $scope.clearChallengeFormValues = clearChallengeFormValues;
        $scope.challengeFormCheck = challengeFormCheck;
        $scope.giveChallenge = giveChallenge;
        $scope.showChallengeFormErrorMessage = showChallengeFormErrorMessage;


        $scope.selectAutoText = function (text) {
            $scope.giveChallengeTo = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
        };

        $scope.$watch('giveChallengeTo', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    (newVal.length > 1) ? $scope.autocompleteHide = false : $scope.autocompleteHide = true;
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });

        GiveChallengeService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        function giveChallenge() {
            var expirationDate = $filter('date')($scope.giveChallengeExpirationDate, requestDateFormat);
            var currentDate = $filter('date')(new Date(), requestDateFormat);
            $scope.userEmail = Resources.getCurrentUserEmail();

            var giveTo = $httpParamSerializer({
                participant: $scope.giveChallengeTo,
                name: $scope.giveChallengeName,
                description: $scope.giveChallengeDescription,
                finishDate: expirationDate,
                amount: $scope.giveChallengeAmountOfKudos
            });


            var challengeCall = challengeFormCheck(expirationDate, currentDate);

            if (challengeCall)
                GiveChallengeService.create(giveTo).then(function (val) {
                    clearChallengeFormValues();
                    $('#giveChallengeModal').modal('hide');
                    toastr.success('You successfully challenged ' + val.data.participant + " with " + val.data.amount + " " + acornPlural(val.data.amount) + '.');
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    Resources.getGivenChallenges().push(val.data);
                }).catch(function () {
                    showChallengeFormErrorMessage("Challenge receiver does not exist");
                })
        }

        function challengeFormCheck(expirationDate, currentDate) {
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
            } else if (expirationDate <= currentDate){
                showChallengeFormErrorMessage("You can not choose date in the past");
                return false;
            }
            showChallengeFormErrorMessage("");
            return true;
        }

        function clearChallengeFormValues() {
            $scope.giveChallengeTo = null;
            $scope.giveChallengeReferee = null;
            $scope.giveChallengeName = null;
            $scope.giveChallengeDescription = null;
            $scope.giveChallengeExpirationDate = null;
            $scope.giveChallengeAmountOfKudos = null;
            $scope.autocompleteHide = true;
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
    };

    GiveChallengeController.$inject = ['$scope', '$httpParamSerializer', 'Resources', 'Challenges', 'GiveChallengeService', '$filter'];

    angular.module('myApp.components.giveChallenge', [])
    .component('kudosGiveChallenge', {
        templateUrl: 'app/components/kudos-give-challenge/kudos-give-challenge.html',
        controller: 'GiveChallengeController'
    })
    .controller('GiveChallengeController', GiveChallengeController)

})();