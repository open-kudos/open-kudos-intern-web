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
            getAllIdeas: getAllIdeas,
            getRandomIdea: getRandomIdea
        }
        return wisdomWall;

        function addIdea(requestData) {
            return $http({
                method: 'POST',
                data: requestData,
                url: SERVER.ip + "/wisdomwall/add",
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

        function getRandomIdea() {
            return $http({
                method: 'GET',
                url: SERVER.ip + "/wisdomwall/randomIdea",
                withCredentials: true
            }).then(function successCallback(response) {
                return response.data;
            });
        }
    }
})();