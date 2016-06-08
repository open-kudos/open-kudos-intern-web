(function () {
    var GiveKudosSmallController = function ($scope, $timeout, $httpParamSerializer, GiveKudosService, Resources) {

        $scope.showError = false;
        $scope.errorMessage = "";

        $scope.maxSendKudosLength = Resources.getUserAvailableKudos();
        $scope.autocompleteHide = true;
        
        $scope.sendKudos = sendKudos;
        $scope.clearSendKudosFormValues = clearSendKudosFormValues;

        this.$onInit = function() {
            $scope.sendKudosTo = this.email;
        };

        $scope.selectAutoText = function (text) {
            $scope.sendKudosTo = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
        };

        $scope.$watch('sendKudosTo', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    (newVal.length > 1) ? $scope.autocompleteHide = false : $scope.autocompleteHide = true;
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });

        GiveKudosService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        function sendKudos() {
            console.log(sendKudosValidation());
            if (sendKudosValidation()) {
                GiveKudosService.sendKudos(getSendToRequestData()).then(function (val) {
                    console.log(val);
                    $scope.showSendKudosModal = false;
                    $scope.showSuccess = true;
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    $('#sendKudosModal').modal('hide');
                    toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                    pushOutgoingTransferIntoCollection(val.data);
                    clearSendKudosFormValues();
                }).catch(function () {
                    showValidationErrorMessage("Receiver doesn't exist");
                });
            }
        }

        function pushOutgoingTransferIntoCollection(val) {
            var itemToAdd = {
                receiver: val.receiver,
                message: val.message,
                amount: val.amount,
                timestamp: trimDate(val.timestamp)
            };
            Resources.getOutgoingKudosCollection().push(itemToAdd);
            Resources.setSentKudosTable();
            showMoreOutgoingKudosButton(Resources.getOutgoingKudosCollection());
        }

        function sendKudosValidation() {
            clearErrorMessages();
            if ($scope.sendKudosTo == null) {
                showValidationErrorMessage("Please enter receiver");
            } else if (!validateEmail($scope.sendKudosTo)) {
                showValidationErrorMessage("Please enter valid receiver email");
            } else if ($scope.sendKudosTo === Resources.getCurrentUserEmail()) {
                showValidationErrorMessage("Can't send kudos to yourself");
            } else if ($scope.sendKudosAmount > Resources.getUserAvailableKudos()) {
                showValidationErrorMessage("You don't have enough Acorns");
            } else if ($scope.sendKudosAmount == null) {
                showValidationErrorMessage("Please enter amount");
            } else if ($scope.sendKudosAmount <= 0) {
                showValidationErrorMessage("Please enter more than zero");
            } else {
                clearErrorMessages();
                return true;
            }
            return false;
        }

        function showValidationErrorMessage(message) {
            $scope.showError = true;
            $scope.errorMessage = message;
        }

        function clearErrorMessages() {
            $scope.showError = false;
            $scope.errorMessage = "";
        }

        function clearSendKudosFormValues() {
            $scope.sendKudosAmount = 0;
            $scope.sendKudosMessage = "";
            clearErrorMessages();
        }

        function getSendToRequestData() {
            return $httpParamSerializer({
                receiverEmail: $scope.sendKudosTo,
                amount: $scope.sendKudosAmount,
                message: $scope.sendKudosMessage
            })
        }

        function validateEmail(email) {
            var reg = /[@]swedbank.[a-z]{2,}/;
            return reg.test(email);
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

        function trimDate(dateString) {
            return dateString.substring(0, 16);
        }

        function showMoreOutgoingKudosButton(val) {
            if (val.length > 5) {
                $scope.moreOutgoing = true;
            }
        }
    };

    GiveKudosSmallController.$inject = ['$scope', '$timeout', '$httpParamSerializer', 'GiveKudosService', 'Resources'];

    angular.module('myApp.components.giveKudosSmall', [])
        .component('kudosGiveKudosSmall', {
            templateUrl: 'app/components/kudos-give-kudos-small/kudos-give-kudos-small.html',
            bindings: {
                email: '@'
            },
            controller: GiveKudosSmallController
        })
})();