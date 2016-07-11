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
        home: getHomeInfo,
        check: checkUser,
        disable: disableUser,
        update: updateUserInfo,
        list: listUsers,
        getTopReceivers: getTopReceivers,
        getTopSenders: getTopSenders
    }
    return user;

    function getHomeInfo() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/home"
        }).then(function successCallback(response) {
            return response.data.user;
        });
    }

    function checkUser() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/"
        }).then(function successCallback(response) {
            return response.data;
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
}
})();