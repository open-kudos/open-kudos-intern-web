(function () {
    angular
        .module('myApp.components.challenges-comment', [])
        .component('kudosChallengeComment', {
            templateUrl: 'app/components/kudos-challenges/kudos-challenge-comment/kudos-challenge-comment.html',
            bindings: {
                challenge: '='
            },
            controller: ('ChallengeCommentController', ChallengeCommentController),
            controllerAs: 'comment'
        });

    ChallengeCommentController.$inject = ['Challenges'];

    function ChallengeCommentController(Challenges) {
        var vm = this;
        
        var pageParams = {page: 0, size: 5};
        var pageResponse;

        vm.message = "";
        vm.commentsCollection = [];

        vm.addComment = addComment;
        vm.formatDate = formatDate;
        vm.loadNextPage = loadNextPage;
        vm.loadPreviousPage = loadPreviousPage;

        vm.$onInit = onInit();

        function onInit() {
            getComments(pageParams);
        }

        function addComment() {
            vm.loading = true;
            var comment = {comment : vm.message};

            if ( vm.message.length > 0 ) {
                Challenges.addComment(vm.challenge.id, comment).then(function (response) {
                    if (response.status === 200) {
                        vm.message = "";
                        getComments(pageParams);
                        vm.loading = false;
                    }
                })
            } else {
                vm.loading = false;
                toastr.error("Your comment is empty");
            }

        }

        function getComments(pageParams) {
            vm.loading = true;
            Challenges.getComments(vm.challenge.id, pageParams).then(function (response) {
                pageResponse = response;
                vm.totalElements = response.totalElements;
                vm.commentsCollection = response.content;
                checkPaginationButtons(response);
                vm.loading = false;
            })
        }

        function loadPreviousPage() {
            if (!pageResponse.first) pageParams.page--;
            getComments(pageParams);
        }

        function loadNextPage() {
            if (!pageResponse.last) pageParams.page++;
            getComments(pageParams);
        }

        /*function loadChallengesHistory(pageParams) {
            vm.loading = true;
            Challenges.getChallengesHistory(pageParams).then(function (response) {
                ChallengesPanelService.setCompletedChallengesAmount(response.totalElements);
                pageResponse = response;
                vm.completedChallengesCollection = response.content;
                Resources.setCompletedChallenges(response.content);
                checkPaginationButtons(response);
                vm.loading = false;
            });
        }*/

        function checkPaginationButtons(pageResponse) {
            vm.showMoreButton = !pageResponse.last;
            vm.showLessButton = !pageResponse.first;
        }

        function formatDate(commentDate) {
            var date = new Date(commentDate);
            return date.getFullYear() + "-" + formatDateNumber(date.getMonth()) + "-" + formatDateNumber(date.getDay())+ "-" + date.getHours() + ":" + date.getMinutes();
        }

        function formatDateNumber(number) {
            return number < 10 ? '0' + number : number;
        }

    }
})();