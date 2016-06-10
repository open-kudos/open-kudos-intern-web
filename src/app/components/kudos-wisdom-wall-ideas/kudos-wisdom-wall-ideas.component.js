(function () {
    var WisdomWallIdeasController = function ($scope, WisdomWallIdeasService){

        WisdomWallIdeasService.getAllIdeas().then(function(val) {
            $scope.allIdeas = val;
            $scope.randomQuote = getRandomQuote();
        });

        function getRandomQuote() {
            return $scope.allIdeas[Math.floor(Math.random() * $scope.allIdeas.length)];
        }

    };

    WisdomWallIdeasController.$inject = ['$scope', 'WisdomWallIdeasService'];

    angular.module('myApp.components.wisdomWallIdeas', [])
        .component('wisdomWallIdeas', {
            templateUrl: 'app/components/kudos-wisdom-wall-ideas/kudos-wisdom-wall-ideas.html',
            controller: 'WisdomWallIdeasController'
        })
        .controller('WisdomWallIdeasController',  WisdomWallIdeasController)
})();