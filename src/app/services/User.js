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
        setCurrentUser: setCurrentUser,
        findUsersByNamePredicate: findUsersByNamePredicate,
        getUserActions: getUserActions,
        subscribe: subscribe,
        unsubscribe: unsubscribe
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
            url: SERVER.ip + "/user/profile/" + userId
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function findUsersByNamePredicate(predicate){
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/email/" + predicate
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function getUserActions(userId, pageRequest) {
        return $http({
            method: 'GET',
            params: pageRequest,
            withCredentials: true,
            url: SERVER.ip + "/user/actions/" + userId
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function subscribe() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/subscribe"
        }).then(function (response) {
            return response;
        });
    }

    function unsubscribe() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/unsubscribe"
        }).then(function (response) {
            return response;
        });
    }

    function getCurrentUser() {
        return currentUser;
    }

    function setCurrentUser(user) {
        currentUser = user;
    }
}
})();