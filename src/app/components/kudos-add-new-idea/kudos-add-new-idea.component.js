(function () {
    var AddNewIdeaController = function ($scope, $timeout, $httpParamSerializer, AddNewIdeaService){


        $scope.addIdea = addIdea;
        $scope.clearAddIdeaFormValues = clearAddIdeaFormValues;

        function addIdea() {
            var newIdea = $httpParamSerializer({
                authorName: $scope.author,
                idea: $scope.idea
            });

            AddNewIdeaService.addNewIdea(newIdea).then(function () {
                $('#addIdeaModal').modal('hide');
                toastr.success('You successfully added new idea to wisdom wall');
                clearAddIdeaFormValues();
            });
        }

        function clearAddIdeaFormValues() {
            $scope.author = "";
            $scope.idea = "";
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