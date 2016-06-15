(function () {
    var WisdomWallIdeasController = function ($scope, WisdomWallIdeasService){

        WisdomWallIdeasService.getRandomIdea().then(function(val) {
            $scope.randomQuote = val;
        });

    };

    WisdomWallIdeasController.$inject = ['$scope', 'WisdomWallIdeasService'];

    angular.module('myApp.components.wisdomWallIdeas', [])
        .component('wisdomWallIdeas', {
            templateUrl: 'app/components/kudos-wisdom-wall-ideas/kudos-wisdom-wall-ideas.html',
            controller: 'WisdomWallIdeasController'
        })
        .controller('WisdomWallIdeasController',  WisdomWallIdeasController)
})();