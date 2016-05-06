angular.module('myApp.components.giveKudos', [])
    .component('kudosGiveKudos', {
        templateUrl: 'app/components/kudos-give-kudos/kudos-give-kudos.html',
        controller: 'GiveKudosController',
    })
    .controller('GiveKudosController', function ($scope, $timeout, $httpParamSerializer, GiveKudosService, Resources) {

        var inputChangedPromise;
        var receiverValidated = false;
        var amountValidated = false;
        var errorMessage = "";

        $scope.maxSendKudosLength = Resources.getUserAvailableKudos();

        $scope.sendKudos = sendKudos;
        $scope.inputChanged = inputChanged;
        $scope.clearSendKudosFormValues = clearSendKudosFormValues;
        $scope.autocompleteHide = true;

        $scope.selectAutoText = function (text) {
            $scope.sendKudosTo = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
            sendKudosValidation();
        };

        $scope.$watch('sendKudosTo', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    if (newVal.length > 1) {
                        $scope.autocompleteHide = false;
                    } else {
                        $scope.autocompleteHide = true;
                    }
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });

        GiveKudosService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        function sendKudos() {
            var sendTo = $httpParamSerializer({
                receiverEmail: $scope.sendKudosTo,
                amount: $scope.sendKudosAmount,
                message: $scope.sendKudosMessage
            });

            GiveKudosService.sendKudos(sendTo).then(function (val) {
                $scope.showSendKudosModal = false;
                $scope.showSuccess = true;
                Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                $('#sendKudosModal').modal('hide');
                toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                pushOutgoingTransferIntoCollection(val.data);
                clearSendKudosFormValues();
            }).catch(function () {
                errorMessage == "" ? showSendKudosErrorMessage("Receiver does not exist") : showSendKudosErrorMessage(errorMessage)
            });
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
                sendKudosReceiverErrorMessage("Please enter receiver");
            } else if (!validateEmail($scope.sendKudosTo)) {
                sendKudosReceiverErrorMessage("Please enter valid receiver email");
            } else if ($scope.sendKudosTo === $scope.userEmail) {
                sendKudosReceiverErrorMessage("Can't send kudos to yourself");
            } else if ($scope.sendKudosAmount > Resources.getUserAvailableKudos()) {
                sendKudosAmountErrorMessage("You don't have enough Acorns");
            } else if ($scope.sendKudosAmount == null) {
                sendKudosAmountErrorMessage("Please enter amount");
            } else if ($scope.sendKudosAmount <= 0) {
                sendKudosAmountErrorMessage("Please enter more than zero");
            } else {
                clearErrorMessages();
            }
        }

        function inputChanged() {
            if (inputChangedPromise) $timeout.cancel(inputChangedPromise);
            inputChangedPromise = $timeout(sendKudosValidation(), 100);
        }

        function sendKudosReceiverErrorMessage(message) {
            $scope.receiverErrorClass = "error-message";
            $scope.fieldReceiverErrorClass = "invalid";
            $scope.receiverErrorMessage = message;
            receiverValidated = false;
            disableSendKudosButton();
        }

        function sendKudosAmountErrorMessage(message) {
            $scope.amountErrorClass = "error-message";
            $scope.fieldAmountErrorClass = "invalid";
            $scope.amountErrorMessage = message;
            amountValidated = false;
            disableSendKudosButton();
        }

        function clearErrorMessages() {
            $scope.receiverErrorMessage = "";
            $scope.receiverErrorClass = "";
            $scope.fieldReceiverErrorClass = "";
            $scope.amountErrorMessage = "";
            $scope.amountErrorClass = "";
            $scope.fieldAmountErrorClass = "";
            enableSendKudosButton();
        }

        function enableSendKudosButton() {
            $scope.buttonDisabled = false;
        }

        function disableSendKudosButton() {
            $scope.buttonDisabled = true;
        }

        function validateEmail(email) {
            var reg = /[@]swedbank.[a-z]{2,}/;
            return reg.test(email);
        }

        function showSendKudosErrorMessage(message) {
            $scope.errorClass = "error-message";
            $scope.sendKudosErrorMessage = message;
            disableSendKudosButton();
        }

        function clearSendKudosFormValues() {
            $scope.sendKudosTo = "";
            $scope.sendKudosAmount = "";
            $scope.sendKudosMessage = "";
            $scope.errorClass = "error-message";
            $scope.sendKudosErrorMessage = "Please enter receiver and amount";
            disableSendKudosButton();
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
    });