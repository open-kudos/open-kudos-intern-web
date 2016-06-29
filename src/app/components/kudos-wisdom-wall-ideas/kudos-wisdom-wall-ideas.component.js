(function () {
    var WisdomWallIdeasController = function ($scope, WisdomWallIdeasService){
        $scope.showLoader = true;

        WisdomWallIdeasService.getRandomIdea().then(function(val) {
            $scope.randomQuote = val;
            $scope.showLoader = false;
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