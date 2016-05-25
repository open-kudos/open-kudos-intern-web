(function () {
    var AddNewIdeaController = function ($scope, $timeout, $httpParamSerializer, AddNewIdeaService){

        $scope.addIdeaFormCheck = addIdeaFormCheck;
        $scope.showAddIdeaFormErrorMessage = showAddIdeaFormErrorMessage;
        $scope.addIdea = addIdea;
        $scope.clearAddIdeaFormValues = clearAddIdeaFormValues;

        function addIdea() {
            var newIdea = $httpParamSerializer({
                authorName: $scope.author,
                idea: $scope.idea
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
            $scope.author = null;
            $scope.idea = null;
            showAddIdeaFormErrorMessage("");
        }

        function addIdeaFormCheck() {
            if ($scope.author == null) {
                showAddIdeaFormErrorMessage("Please enter author of the idea");
                return false;
            } else if ($scope.idea == null) {
                showAddIdeaFormErrorMessage("Please enter idea");
                return false;
            }
            showAddIdeaFormErrorMessage("");
            return true;
        }

        function showAddIdeaFormErrorMessage(message) {
            $scope.errorClass = "error-message";
            $scope.addIdeaFormErrorMessage = message;
        }
    };

    AddNewIdeaController.$inject = ['$scope', '$timeout', '$httpParamSerializer', 'AddNewIdeaService'];

    angular.module('myApp.components.addNewIdea', [])
        .component('kudosAddNewIdea', {
            templateUrl: 'app/components/kudos-add-new-idea/kudos-add-new-idea.html',
            controller: 'AddNewIdeaController'
        })
        .controller('AddNewIdeaController',  AddNewIdeaController)
})();