(function () {
    angular.module('myApp.components.giveKudos', [])
        .component('kudosGiveKudos', {
            template: '<ng-include src="vm.getTemplate(vm.template)"/>' ,
            bindings: {
                email: '<',
                index: '<',
                template: '='
            },
            controller: ("GiveKudosController", GiveKudosController),
            controllerAs: "vm"
        });

    GiveKudosController.$inject = ['$httpParamSerializer', 'GiveKudosService', 'Resources', 'Kudos'];

    function GiveKudosController($httpParamSerializer, GiveKudosService, Resources, Kudos) {
        var vm = this;

        vm.showError = false;
        vm.errorMessage = "";
        vm.userAvailableKudos = 0;
        vm.usersCollection = [];

        vm.maxSendKudosLength = Resources.getUserAvailableKudos();
        vm.autocompleteHide = true;

        vm.sendKudos = sendKudos;
        vm.clearSendKudosFormValues = clearSendKudosFormValues;
        vm.sendToInputChanged = sendToInputChanged;
        vm.selectAutoText = selectAutoText;
        vm.getTemplate = getTemplate;
        vm.sendKudosValidation = sendKudosValidation;
        vm.showValidationErrorMessage = showValidationErrorMessage;

        vm.$onInit = onInit();

        function onInit() {

            if (vm.email != undefined && vm.index != undefined){
                vm.sendKudosTo = vm.email;
                vm.id = vm.index;
            }

            if (Resources.getUserAvailableKudos() == undefined) {
                Kudos.remaining().then(function (amount) {
                    Resources.setUserAvailableKudos(amount);
                    vm.userAvailableKudos = amount;
                })
            } else {
                vm.userAvailableKudos = Resources.getUserAvailableKudos();
            }

            if (isEmptyCollection(Resources.getUsersCollection())) {
                GiveKudosService.listUsers().then(function (val) {
                    Resources.setUsersCollection(val.userList);
                    vm.usersCollection = Resources.getUsersCollection();
                })
            } else {
                vm.usersCollection = Resources.getUsersCollection();
            }
        }

        function sendToInputChanged() {
            if (vm.searchTermSelected == false) {
                if (vm.sendKudosTo != undefined) {
                    (vm.sendKudosTo.length > 1) ? vm.autocompleteHide = false : vm.autocompleteHide = true;
                }
            } else {
                vm.searchTermSelected = false;
            }
        }

        function selectAutoText(text) {
            vm.sendKudosTo = text;
            vm.searchTermSelected = true;
            vm.autocompleteHide = true;
            vm.text = text;
        }

        function sendKudos() {
            if (sendKudosValidation()) {
                GiveKudosService.sendKudos(getSendToRequestData()).then(function (val) {
                    vm.showSendKudosModal = false;
                    vm.showSuccess = true;
                    Resources.setUserAvailableKudos(Resources.getUserAvailableKudos() - val.data.amount);
                    closeModal();
                    toastr.success('You successfully sent ' + acornPlural(val.data.amount) + ' to ' + val.data.receiver);
                    pushOutgoingTransferIntoCollection(val.data);
                    clearSendKudosFormValues();
                    onInit();
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
        }

        function sendKudosValidation() {
            clearErrorMessages();
            if (vm.sendKudosTo == null) {
                showValidationErrorMessage("Please enter receiver");
            } else if (!validateEmail(vm.sendKudosTo)) {
                showValidationErrorMessage("Please enter valid receiver email");
            } else if (vm.sendKudosTo === Resources.getCurrentUserEmail()) {
                showValidationErrorMessage("Can't send kudos to yourself");
            } else if (vm.sendKudosAmount > Resources.getUserAvailableKudos()) {
                showValidationErrorMessage("You don't have enough Acorns");
            } else if (vm.sendKudosAmount == null) {
                showValidationErrorMessage("Please enter amount");
            } else if (vm.sendKudosAmount <= 0) {
                showValidationErrorMessage("Please enter more than zero");
            } else {
                clearErrorMessages();
                return true;
            }
            return false;
        }

        function showValidationErrorMessage(message) {
            vm.showError = true;
            vm.errorMessage = message;
        }

        function clearErrorMessages() {
            vm.showError = false;
            vm.errorMessage = "";
        }

        function clearSendKudosFormValues() {
            vm.sendKudosTo = "";
            vm.sendKudosAmount = null;
            vm.autocompleteHide = true;
            vm.sendKudosMessage = "";
            clearErrorMessages();
        }

        function getSendToRequestData() {
            return $httpParamSerializer({
                receiverEmail: vm.sendKudosTo,
                amount: vm.sendKudosAmount,
                message: vm.sendKudosMessage
            })
        }

        function closeModal() {
            vm.template != undefined ? $('#modal' + vm.id).modal('hide') : $('#sendKudosModal').modal('hide');
        }

        function getTemplate(template) {
            if (template == "button"){
                return 'app/components/kudos-give-kudos/kudos-give-kudos-small.html';
            } else {
                return 'app/components/kudos-give-kudos/kudos-give-kudos.html'
            }
        }



    }

})();