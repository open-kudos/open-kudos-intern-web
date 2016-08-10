(function () {
    "use strict";
    angular.module("myApp")
        .factory("Auth", Auth);

    Auth.$inject = [
        "$http",
        '$q',
        "SERVER"
    ];

    var noJsonTransform = function(data) { return data; };

    function Auth($http, $q, SERVER) {
        var service = {
            register: Register,
            login: Login,
            logout: Logout,
            confirm: Confirm,
            check: CheckUser
        };
        return service;

        function Register(requestData) {
            if (requestData.password === requestData.confirmPassword) {
                return $http({
                    method: 'POST',
                    withCredentials: true,
                    data : requestData,
                    url: SERVER.ip + "/authentication/register"
                }).then(function (response) {
                    return response.data;
                });
            } else {
                return error = {
                    message: "NO_MATCH_PASSWORD"
                };
            }
        }

        function Login(data) {
            return $http({
                method: 'POST',
                withCredentials: true,
                data : data,
                url: SERVER.ip + "/authentication/login",
                transformResponse: noJsonTransform
            }).then(function (response) {
                return response;
            })
        }

        function Logout() {
            return $http({
                method: 'POST',
                withCredentials: true,
                url: SERVER.ip + "/authentication/logout"
            }).then(function (response) {
                return response;
            });
        }

        function Confirm(confirmationCode) {
            return $http({
                withCredentials: true,
                method: 'POST',
                url: SERVER.ip + "/authentication/confirm/" + confirmationCode
            }).then(function (response) {
                return response.data;
            });
        }

        function CheckUser() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: SERVER.ip,
                withCredentials: true
            }).then(function successCallback(response) {
                if (response.data.logged === true){
                    deferred.resolve()
                }else {
                    deferred.reject()
                }
            }, function errorCallback(error) {
                deferred.reject();
            });

            return deferred.promise;
        }

    }
})();