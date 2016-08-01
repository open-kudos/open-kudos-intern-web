(function () {
    angular.module('myApp.components.confirm-email', [])
        .component('kudosConfirmEmail', {
            templateUrl: 'app/components/kudos-confirm-email/kudos-confirm-email.html',
            controller: 'ConfirmEmailController'
        })
        .controller('ConfirmEmailController', ConfirmEmailController)

    ConfirmEmailController.$inject = ['$scope', '$location', 'ConfirmEmailService'];

    function ConfirmEmailController($scope, $location, ConfirmEmailService) {

        $scope.confirm = confirm;

        function confirm(confirmationCode) {
            ConfirmEmailService.confirmUser(confirmationCode).then(function (val) {
                var $openModalSelector = $(".modal.fade.in");
                if (val != "Error") {
                    toastr.success("Confirmed successfully, you can login now", "Success");
                    $openModalSelector.modal("hide");
                } else {
                    toastr.error("Wrong activation code", "Error");
                }
            })
        }
        
        $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            var $openModalSelector = $(".modal.fade.in");
            if (($openModalSelector.data('bs.modal') || {}).isShown == true) {
                $openModalSelector.modal("hide");
                event.preventDefault();
            }
        });

    };
})();
