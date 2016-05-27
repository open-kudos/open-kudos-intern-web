/**
 * Created by vytautassugintas on 25/05/16.
 */
(function () {

    var RelationshipController = function ($scope, $httpParamSerializer, RelationService, Resources) {

        $scope.followedCollection = [];
        $scope.followersCollection = [];

        $scope.addFollower = addFollower;
        $scope.removeFollowing = removeFollowing;

        RelationService.getFollowing().then(function () {
            $scope.followedCollection = RelationService.getFollowingCollection();
        });

        RelationService.getFollowers().then(function () {
            $scope.followersCollection = RelationService.getFollowers();
        });

        function addFollower(email) {
            RelationService.addFollower(transferDataToParam(email)).then(function (response) {
                addFollowingToCollection(response.data);
                console.log(response);
                toastr.success("Started to follow " + response.data.userName);
            })
        }

        function removeFollowing(email, name, index) {
            RelationService.removeFollowing(transferDataToParam(email)).then(function () {
                removeFollowingFromCollection(index);
                toastr.success("Unfollowed " + name);
            })
        }
        
        function addFollowingToCollection(follower) {
            $scope.followedCollection.push(follower);
        }

        function removeFollowingFromCollection(followerIndex) {
            $scope.followedCollection.splice(followerIndex, 1);
        }
        
        function transferDataToParam(email) {
            return $httpParamSerializer({
                email: email
            });
        }

    };

    RelationshipController.$inject = ['$scope', '$httpParamSerializer', 'RelationService', 'Resources'];

    angular.module('myApp.components.relationship', [])
        .component('kudosRelationship', {
            templateUrl: 'app/components/kudos-relationship/kudos-relationship.html',
            controller: 'RelationshipController'
        })
        .controller('RelationshipController', RelationshipController)

})();