/**
 * Created by vytautassugintas on 25/05/16.
 */
(function () {

    var RelationshipController = function ($scope, $filter, $httpParamSerializer, RelationService ,Resources) {

        $scope.friendsCollection = [];

        RelationService.followed().then(function (followed) {
            $scope.friendsCollection = followed;
        })

    };

    RelationshipController.$inject = ['$scope', '$filter', '$httpParamSerializer', 'RelationService', 'Resources'];

    angular.module('myApp.components.relationship', [])
        .component('kudosRelationship', {
            templateUrl: 'app/components/kudos-relationship/kudos-relationship.html',
            controller: 'RelationshipController'
        })
        .controller('RelationshipController', RelationshipController)

})();