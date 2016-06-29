(function () {
    AddNewIdeaController.$inject = ['$httpParamSerializer', 'AddNewIdeaService'];

    angular.module('myApp.components.addNewIdea', [])
        .component('kudosAddNewIdea', {
            templateUrl: 'app/components/kudos-add-new-idea/kudos-add-new-idea.html',
            controller: ('AddNewIdeaController',  AddNewIdeaController),
            controllerAs: 'newIdea'
        });

    function AddNewIdeaController($httpParamSerializer, AddNewIdeaService){
        var self = this;

        self.lengthLimit = lengthLimit;
        self.symbolsLeft = symbolsLeft;
        self.addIdeaFormCheck = addIdeaFormCheck;
        self.showAddIdeaFormErrorMessage = showAddIdeaFormErrorMessage;
        self.addIdea = addIdea;
        self.clearAddIdeaFormValues = clearAddIdeaFormValues;

        function addIdea() {
            var newIdea = $httpParamSerializer({
                authorName: self.author,
                idea: self.idea
            });

            var isValid = addIdeaFormCheck();

            if (isValid) {
                AddNewIdeaService.addNewIdea(newIdea).then(function () {
                    $('#addIdeaModal').modal('hide');
                    toastr.success('You successfully added new idea to wisdom wall');
                    clearAddIdeaFormValues();
                });
            }
        }

        function clearAddIdeaFormValues() {
            self.author = null;
            self.idea = null;
            showAddIdeaFormErrorMessage("");
        }

        function addIdeaFormCheck() {
            if (self.author == null) {
                showAddIdeaFormErrorMessage("Please enter author of the idea");
                return false;
            } else if (self.idea == null) {
                showAddIdeaFormErrorMessage("Please enter idea");
                return false;
            }

            showAddIdeaFormErrorMessage("");
            return true;
        }

        function showAddIdeaFormErrorMessage(message) {
            self.errorClass = "error-message";
            self.addIdeaFormErrorMessage = message;
        }
    }
})();