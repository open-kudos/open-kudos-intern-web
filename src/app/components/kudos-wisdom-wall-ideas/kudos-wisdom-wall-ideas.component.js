(function () {
    angular.module('myApp.components.wisdomWallIdeas', [])
        .component('wisdomWallIdeas', {
            templateUrl: 'app/components/kudos-wisdom-wall-ideas/kudos-wisdom-wall-ideas.html',
            controller: ('WisdomWallIdeasController',  WisdomWallIdeasController),
            controllerAs: 'wisdom'
        });

    WisdomWallIdeasController.$inject = ['WisdomWallIdeasService', 'Utils'];

    function WisdomWallIdeasController(WisdomWallIdeasService, Utils){
        var vm = this;

        vm.showLoader = true;

        WisdomWallIdeasService.getRandomIdea().then(function(val) {
            vm.randomQuote = val;
            vm.showLoader = false;
        });

        vm.lengthLimit = Utils.lengthLimit;
        vm.symbolsLeft = Utils.symbolsLeft;
        vm.addIdeaFormCheck = addIdeaFormCheck;
        vm.showAddIdeaFormErrorMessage = showAddIdeaFormErrorMessage;
        vm.addIdea = addIdea;
        vm.clearAddIdeaFormValues = clearAddIdeaFormValues;

        function addIdea() {
            var newIdea = {
                author: vm.author,
                phrase: vm.idea
            };

            var isValid = addIdeaFormCheck();

            if (isValid) {
                WisdomWallIdeasService.addNewIdea(newIdea).then(function () {
                    $('#addIdeaModal').modal('hide');
                    toastr.success('You successfully added new idea to wisdom wall');
                    clearAddIdeaFormValues();
                });
            }
        }

        function clearAddIdeaFormValues() {
            vm.author = null;
            vm.idea = null;
            showAddIdeaFormErrorMessage("");
        }

        function addIdeaFormCheck() {
            if (vm.author == null) {
                showAddIdeaFormErrorMessage("Please enter author of the idea");
                return false;
            } else if (vm.idea == null) {
                showAddIdeaFormErrorMessage("Please enter idea");
                return false;
            }

            showAddIdeaFormErrorMessage("");
            return true;
        }

        function showAddIdeaFormErrorMessage(message) {
            vm.errorClass = "error-message";
            vm.addIdeaFormErrorMessage = message;
        }
    }
})();