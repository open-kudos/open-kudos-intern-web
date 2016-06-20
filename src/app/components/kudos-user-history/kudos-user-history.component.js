(function () {
    var UserHistoryController = function($scope){
        var self = this;

        this.$onInit = function() {
            self.userEmail = this.email;
            self.id = this.index;
            console.log(self.userEmail);
        };

    };

    UserHistoryController.$inject = ['$scope'];

    angular.module('myApp.components.userHistory', [])
        .component('kudosUserHistory', {
            templateUrl: 'app/components/kudos-user-history/kudos-user-history.html',
            bindings: {
                email: '<',
                index: '<'
            },
            controller: 'UserHistoryController',
            controllerAs: 'self'
        })
        .controller('UserHistoryController', UserHistoryController)

})();