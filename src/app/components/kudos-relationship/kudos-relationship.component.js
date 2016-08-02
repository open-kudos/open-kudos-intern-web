(function () {
    angular
        .module('myApp.components.relationship', [])
        .component('kudosRelationship', {
            templateUrl: 'app/components/kudos-relationship/kudos-relationship.html',
            controller: ('RelationshipController', RelationshipController),
            controllerAs: 'relation'
        });

    RelationshipController.$inject = ['Relation'];

    function RelationshipController(Relation) {
        var vm = this;

        vm.pageParams = {page: 0, size: 5};
        vm.followedCollection = [];
        vm.folllowingCollection = [];
        vm.selectedEmail = "";
        vm.acornsAmount = 1;
        vm.showGiveBox = false;

        vm.followByEmail = followByEmail;
        vm.followById = followById;
        vm.removeFollowing = removeFollowing;

        vm.addFollowingToCollection = addFollowingToCollection;
        vm.removeFollowingFromCollection = removeFollowingFromCollection;
        vm.selectAutoText = selectAutoText;
        vm.onInputChange = onInputChange;

        vm.$onInit = onInit();

        function onInit() {
            getFollowers(vm.pageParams);
            getFollowing(vm.pageParams);
        }

        function selectAutoText(text) {
            vm.followerEmail = text;
            vm.autocompleteHide = true;
            vm.text = text;
        }

        function onInputChange() {
            if (vm.followerEmail != undefined)
                (vm.followerEmail.length > 1) ? vm.autocompleteHide = false : vm.autocompleteHide = true;
        }
        
        function followByEmail(email) {
            Relation.followByEmail({userEmail: email}).then(function (response) {
                if (response.status == 200)
                    toastr.success("Started to follow " + email);
            }).catch(function (error) {
                // TODO Catch errors and show right messages
                toastr.error("Something went wrong")
            })
        }

        function followById(id) {
            Relation.followById({userId: id}).then(function (response) {
                if (response.status == 200){
                    toastr.success("Success");
                }
            })
        }

        function removeFollowing(id) {
            Relation.unfollow({userId: id}).then(function (response) {
                if (response.status == 200){
                    toastr.success("Unfollowed");
                }
            })
        }

        function getFollowers(pageParams) {
            Relation.getFollowers(pageParams).then(function (response) {
                vm.folllowingCollection = response.content;
            })
        }

        function getFollowing(pageParams) {
            Relation.getFollowing(pageParams).then(function (response) {
                vm.followedCollection = response.content;
            })
        }
        
        function addFollowingToCollection(follower) {
            vm.followedCollection.push(follower);
        }

        function removeFollowingFromCollection(followerIndex) {
            vm.followedCollection.splice(followerIndex, 1);
        }
        
    }
})();