(function () {
    angular.module('myApp.components.wisdomWallIdeas', [])
        .component('wisdomWallIdeas', {
            templateUrl: 'app/components/kudos-wisdom-wall-ideas/kudos-wisdom-wall-ideas.html',
            controller: ('WisdomWallIdeasController',  WisdomWallIdeasController),
            controllerAs: 'wisdom'
        });

    WisdomWallIdeasController.$inject = ['WisdomWallIdeasService'];

    function WisdomWallIdeasController(WisdomWallIdeasService){
        var vm = this;

        vm.showLoader = true;

        WisdomWallIdeasService.getRandomIdea().then(function(val) {
            vm.randomQuote = val;
            vm.showLoader = false;
        });
    }
})();