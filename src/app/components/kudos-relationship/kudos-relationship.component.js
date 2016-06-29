(function () {

    var RelationshipController = function ($scope, $httpParamSerializer, RelationService, GiveKudosService, Resources) {
        
        $scope.followedCollection = [];
        $scope.followersCollection = [];
        $scope.selectedEmail = "namas";
        $scope.acornsAmount = 1;
        $scope.showGiveBox = false;

        $scope.addFollower = addFollower;
        $scope.removeFollowing = removeFollowing;
        $scope.addFollowingToCollection = addFollowingToCollection;
        $scope.removeFollowingFromCollection = removeFollowingFromCollection;
        $scope.transferDataToParam = transferDataToParam;
        $scope.selectRelationEmail = selectRelationEmail;
        $scope.onModalHideEvent = onModalHideEvent;

        $scope.selectAutoText = function (text) {
            $scope.followerEmail = text;
            $scope.searchTermSelected = true;
            $scope.autocompleteHide = true;
        };

        $scope.$watch('followerEmail', function (newVal, oldVal) {
            if ($scope.searchTermSelected == false) {
                if (newVal != undefined) {
                    (newVal.length > 1) ? $scope.autocompleteHide = false : $scope.autocompleteHide = true;
                }
            } else {
                $scope.searchTermSelected = false;
            }
        });

        GiveKudosService.listUsers().then(function (val) {
            $scope.usersCollection = val.userList;
        });

        RelationService.getFollowing().then(function () {
            $scope.followedCollection = RelationService.getFollowingCollection();
        });

        RelationService.getFollowers().then(function () {
            $scope.followersCollection = RelationService.getFollowers();
        });

        function onModalHideEvent(whichBox) {
            whichBox == true ? whichBox = false : whichBox = true;
            console.log(whichBox);
            $(document).on('hide.bs.modal','#sendKudosModalSmall', function () {
                whichBox == true ? whichBox = false : whichBox = true;
                console.log(whichBox);
                console.log("hidding");
            });
        }

        function addFollower(email) {
            RelationService.addFollower(transferDataToParam(email)).then(function (response) {
                addFollowingToCollection(response.data);
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

        function selectRelationEmail(email) {
            $scope.selectedEmail = email;
            console.log(email);
        }

    };

    RelationshipController.$inject = ['$scope', '$httpParamSerializer', 'RelationService', 'GiveKudosService', 'Resources'];

    angular.module('myApp.components.relationship', [])
        .component('kudosRelationship', {
            templateUrl: 'app/components/kudos-relationship/kudos-relationship.html',
            controller: 'RelationshipController'
        })
        .controller('RelationshipController', RelationshipController)

})();