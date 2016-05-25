(function () {
    "use strict";
    angular.module("myApp.components.wisdomWallIdeas")
        .factory("WisdomWallIdeasService", WisdomWallIdeasService);

    WisdomWallIdeasService.$inject = [
        "WisdomWall"
    ];

    function WisdomWallIdeasService(wisdomWallBackend) {
        var service = {
            getAllIdeas: GetAllIdeas
        };
        return service;

        function GetAllIdeas() {
            return wisdomWallBackend.getAllIdeas();
        }

    }
})();