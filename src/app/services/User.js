(function() {
"use strict";
angular.module("myApp")
    .factory("User", User);

User.$inject = [
    "$http",
    "SERVER"
];

function User($http, SERVER) {
    var user = {
        getCurrentUserProfile: getCurrentUserProfile,
        updateUserProfile: updateUserProfile,
        getUserProfile: getUserProfile,

        check: checkUser,
        disable: disableUser,
        update: updateUserInfo,
        list: listUsers,
        getTopReceivers: getTopReceivers,
        getTopSenders: getTopSenders,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    }
    return user;

    /**
     * V2
     */

    function getCurrentUserProfile() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/profile"
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    function updateUserProfile(requestData) {
        return $http({
            method: 'POST',
            data: requestData,
            withCredentials: true,
            url: SERVER.ip + "/user/update"
        }).then(function successCallback(response) {
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

    /**
     * V2
     */

    function checkUser() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/"
        }).then(function successCallback(response) {
            return response.data.logged;
        });
    }

    function disableUser() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/disable"
        }).then(function (response) {
            return response.data;
        })
    }

    function updateUserInfo(userInfo) {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/update?" + userInfo
        }).then(function (response) {
            return response.data;
        })
    }

    function listUsers() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/confirmedUsers"
        }).then(function (response) {
            return response.data;
        })
    }

    function getTopReceivers(requestData) {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/topreceivers?" + requestData
        }).then(function (response) {
            return response.data;
        })
    }

    function getTopSenders(requestData) {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/topsenders?" + requestData
        }).then(function (response) {
            return response.data;
        })
    }
    
    function unsubscribe() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/unsubscribe"
        }).then(function (response) {
            return response.data;
        })
    }
    
    function subscribe() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/subscribe"
        }).then(function (response) {
            return response.data;
        })
    }
}
})();