(function () {
    "use strict";
    angular.module("myApp.components.addNewIdea")
        .factory("AddNewIdeaService", AddNewIdeaService);

    AddNewIdeaService.$inject = [
        "$q",
        "WisdomWall"
    ];

    function AddNewIdeaService($q, wisdomWallBackend) {
        var service = {
            addNewIdea: AddNewIdea
        };
        return service;

        function AddNewIdea(idea) {
            var deferred = $q.defer();
            wisdomWallBackend.addIdea(idea).then(function (response) {
                deferred.resolve(response);
            }).catch(function(response){
                deferred.reject(response);
            });
            return deferred.promise;
        }
    }
})();