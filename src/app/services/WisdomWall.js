(function() {
    "use strict";
    angular.module("myApp")
        .factory("WisdomWall", WisdomWall);

    WisdomWall.$inject = [
        "$http",
        "SERVER"
    ];

    function WisdomWall($http, SERVER) {
        var wisdomWall = {
            addIdea: addIdea,
            getAllIdeas: getAllIdeas
        }
        return wisdomWall;

        function addIdea(requestData) {
            return $http({
                method: 'POST',
                url: SERVER.ip + "/wisdomwall/addidea?" + requestData,
                withCredentials: true
            }).then(function (response) {
                return response.data;
            });
        }

        function getAllIdeas() {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/wisdomwall/getideas",
                withCredentials: true
            }).then(function successCallback(response) {
                return response.data;
            });
        }
    }
})();