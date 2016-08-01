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
        var requestParams = {page: 0, size: 5};

        vm.message = "";
        vm.commentsCollection = [];

        vm.addComment = addComment;
        vm.formatDate = formatDate;

        vm.$onInit = onInit();

        function onInit() {
            console.log(vm.challenge);
            getComments();
        }

        function addComment() {
            var comment = {comment : vm.message};

            Challenges.addComment(vm.challenge.id, comment).then(function (response) {
                if (response.status === 200){
                    vm.message = null;
                    getComments();
                }
            })
        }

        function getComments() {
            Challenges.getComments(vm.challenge.id, requestParams).then(function (pageResponse) {
                console.log(pageResponse);
                vm.commentsCollection = pageResponse.content;
            })
        }

        function formatDate(commentDate) {
            var date = new Date(commentDate);
            console.log(date);
            return date.getFullYear() + "-" + formatDateNumber(date.getMonth()) + "-" + formatDateNumber(date.getDay())+ "-" + date.getHours() + ":" + date.getMinutes();
        }

        function formatDateNumber(number) {
            return number < 10 ? '0' + number : number;
        }

    }
})();