(function () {
    angular.module('myApp.components.receivedAcorns', [])
        .component('kudosReceivedAcorns', {
            templateUrl: 'app/components/kudos-received-acorns/kudos-received-acorns.html',
            controller: 'ReceivedAcornsController'
        })
        .controller('ReceivedAcornsController', function ($scope, ReceivedAcornsService, Resources) {

            var showMoreLimit = 5;
            $scope.incomingKudosShowLimit = 5;

            $scope.showMoreIncomingKudos = showMoreIncomingKudos;
            $scope.showLessIncomingKudos = showLessIncomingKudos;
            $scope.showMoreIncomingKudosButton = showMoreIncomingKudosButton;

            ReceivedAcornsService.incomingKudos().then(function (val) {
                Resources.setIncomingKudosCollection(val);
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

            function showMoreIncomingKudos() {
                if ($scope.incomingKudosShowLimit <= Resources.getIncomingKudosCollection().length) {
                    $scope.incomingKudosShowLimit += showMoreLimit;
                }
            }

            function showLessIncomingKudos() {
                $scope.incomingKudosShowLimit = showMoreLimit;
            }
        });
})();