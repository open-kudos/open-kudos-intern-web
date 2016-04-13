/**
 * Created by vytautassugintas on 10/04/16.
 */
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
        list: listUsers
    }
    return user;

    function getHomeInfo() {
        return $http({
            method: 'GET',
            withCredentials: true,
            url: SERVER.ip + "/user/home"
        }).then(function successCallback(response) {
            return response.data;
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
        return $http.post(SERVER.ip + "/user/update?" + userInfo).then(function (response) {
            return response.data;
        })
    }

    function listUsers() {
        return $http({
            method: 'POST',
            withCredentials: true,
            url: SERVER.ip + "/user/list"
        }).then(function (response) {
            return response.data;
        })
    }
}