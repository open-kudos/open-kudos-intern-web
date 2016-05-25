(function () {
    'use strict';
    var WisdomWallController = function ($http, $scope) {

    };

    WisdomWallController.$inject = ['$http', '$scope'];

    angular
        .module('myApp.acorn.wisdomWall', [
            'ngRoute',
            'ngCookies'
        ])
        .controller('WisdomWallController', WisdomWallController);
})();