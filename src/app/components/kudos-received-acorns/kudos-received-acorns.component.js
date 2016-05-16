(function () {
    angular.module('myApp.components.receivedAcorns', [])
        .component('kudosReceivedAcorns', {
            templateUrl: 'app/components/kudos-received-acorns/kudos-received-acorns.html',
            controller: 'ReceivedAcornsController'
        })
        .controller('ReceivedAcornsController', function ($scope, $cookies, ReceivedAcornsService, Resources) {

            var showMoreLimit = 5;
            $scope.incomingKudosShowLimit = 5;

            $scope.showMoreIncomingKudos = showMoreIncomingKudos;
            $scope.showLessIncomingKudos = showLessIncomingKudos;
            $scope.showMoreIncomingKudosButton = showMoreIncomingKudosButton;
            $scope.splitDate = splitDate;
            $scope.formatDateWithoutYears = formatDateWithoutYears;
            $scope.test = test;
            $scope.acornPlural = acornPlural;

            ReceivedAcornsService.incomingKudos().then(function (val) {
                Resources.setIncomingKudosCollection(val);
                if ($cookies.get('last_transaction') == null){
                    $cookies.put('last_transaction', val[0].timestamp);
                }
                $scope.incomingKudosCollection = Resources.getIncomingKudosCollection();
                showMoreIncomingKudosButton(val);
                Resources.setReceivedKudosTable();
                $scope.receivedKudosTable = Resources.getReceivedKudosTable();
            });

            function showMoreIncomingKudosButton(val) {
                if (val.length > 5) {
                    $scope.moreIncoming = true;
                }
            }

            function test() {
                console.log("TEST");
            }

            function showMoreIncomingKudos() {
                if ($scope.incomingKudosShowLimit <= Resources.getIncomingKudosCollection().length) {
                    $scope.incomingKudosShowLimit += showMoreLimit;
                }
            }

            function showLessIncomingKudos() {
                $scope.incomingKudosShowLimit = showMoreLimit;
            }

            function formatDateWithoutYears(date) {
                return splitDate(date)[1] + "-" + splitDate(date)[2];
            }

            function splitDate(date) {
                return date.split("-");
            }

            function acornPlural(amount) {
                return amount > 1 ? amount + " Acorns" : amount + " Acorn"
            }

            $('#dateTooltip').tooltip('show');

            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
        });
})();