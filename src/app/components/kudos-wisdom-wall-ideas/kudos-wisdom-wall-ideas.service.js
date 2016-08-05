(function () {
    "use strict";
    angular.module("myApp.components.wisdomWallIdeas")
        .factory("WisdomWallIdeasService", WisdomWallIdeasService);

    WisdomWallIdeasService.$inject = [
        "WisdomWall"
    ];

    function WisdomWallIdeasService(wisdomWallBackend) {
        var service = {
            getAllIdeas: GetAllIdeas,
            getRandomIdea: GetRandomIdea,
            addNewIdea: AddNewIdea
        };
        return service;

        function GetAllIdeas() {
            return wisdomWallBackend.getAllIdeas();
        }

        function GetRandomIdea() {
            return wisdomWallBackend.getRandomIdea();
        }

        function AddNewIdea(idea) {
            return wisdomWallBackend.addIdea(idea);
        }

    }
})();