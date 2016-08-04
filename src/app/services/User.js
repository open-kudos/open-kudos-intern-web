(function() {
"use strict";
angular.module("myApp")
    .factory("User", User);

User.$inject = [
    "$http",
    '$q',
    "SERVER"
];

function User($http, $q, SERVER) {

    var currentUser = null;

    var user = {
        getCurrentUserProfile: getCurrentUserProfile,
        updateUserProfile: updateUserProfile,
        getUserProfile: getUserProfile,
        getCurrentUser: getCurrentUser,
        setCurrentUser: setCurrentUser
    }
    return user;

    function getCurrentUserProfile() {
        var deferred = $q.defer();
        if (currentUser != null){
            deferred.resolve();
        } else {
            $http({
                method: 'GET',
                withCredentials: true,
                url: SERVER.ip + "/user/profile"
            }).then(function successCallback(response) {
                currentUser = response.data;
                deferred.resolve();
            });
        }
        return deferred.promise;
    }

    function updateUserProfile(requestData) {
        return $http({
            method: 'POST',
            data: requestData,
            withCredentials: true,
            url: SERVER.ip + "/user/update"
        }).then(function (response) {
            return response;
        });
    }

    function getUserProfile(userId) {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/profile?" + userId
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getCurrentUser() {
        return currentUser;
    }

    function setCurrentUser(user) {
        this.currentUser = user;
    }
}
})();