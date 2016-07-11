(function () {

    RelationshipController.$inject = ['$httpParamSerializer', 'RelationService', 'GiveKudosService', 'Resources'];

    angular
        .module('myApp.components.relationship', [])
        .component('kudosRelationship', {
            templateUrl: 'app/components/kudos-relationship/kudos-relationship.html',
            controller: ('RelationshipController', RelationshipController),
            controllerAs: 'relation'
        });

    function RelationshipController($httpParamSerializer, RelationService, GiveKudosService, Resources) {
        var vm = this;

        vm.followedCollection = [];
        vm.followersCollection = [];
        vm.selectedEmail = "namas";
        vm.acornsAmount = 1;
        vm.showGiveBox = false;

        vm.addFollower = addFollower;
        vm.removeFollowing = removeFollowing;
        vm.addFollowingToCollection = addFollowingToCollection;
        vm.removeFollowingFromCollection = removeFollowingFromCollection;
        vm.transferDataToParam = transferDataToParam;
        vm.selectRelationEmail = selectRelationEmail;
        vm.onModalHideEvent = onModalHideEvent;
        vm.selectAutoText = selectAutoText;
        vm.onInputChange = onInputChange;

        vm.$onInit = onInit();

        function onInit() {
            GiveKudosService.listUsers().then(function (val) {
                vm.usersCollection = val;
            });

            RelationService.getFollowing().then(function () {
                vm.followedCollection = RelationService.getFollowingCollection();
            });

            RelationService.getFollowers().then(function () {
                vm.followersCollection = RelationService.getFollowers();
            });
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
            if (email)
                if (email == Resources.getCurrentUser().email){
                    toastr.error("You can't follow yourself");
                    vm.followerEmail = '';
                } else {
                    RelationService.addFollower(transferDataToParam(email)).then(function (response) {
                        addFollowingToCollection(response.data);
                        vm.followerEmail = '';
                        toastr.success("Started to follow " + response.data.userName, 'Following');
                    })
                }
        }

        function removeFollowing(email, name, index) {
            RelationService.removeFollowing(transferDataToParam(email)).then(function () {
                removeFollowingFromCollection(index);
                toastr.success("Unfollowed " + name);
            })
        }
        
        function addFollowingToCollection(follower) {
            vm.followedCollection.push(follower);
        }

        function removeFollowingFromCollection(followerIndex) {
            vm.followedCollection.splice(followerIndex, 1);
        }
        
        function transferDataToParam(email) {
            return $httpParamSerializer({
                email: email
            });
        }

        function selectRelationEmail(email) {
            vm.selectedEmail = email;
            console.log(email);
        }

    }
})();