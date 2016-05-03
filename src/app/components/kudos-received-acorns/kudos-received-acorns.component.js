angular.module('myApp.components.received', [])
    .component('kudosReceivedAcorns', {
        templateUrl: 'app/components/kudos-received-acorns/kudos-received-acorns.html',
        controller: 'ReceivedAcornsController'
    })
    .controller('ReceivedAcornsController', function ($scope, ReceivedAcornsService) {

        var showMoreLimit = 5;
        $scope.incomingKudosShowLimit = 5;
        $scope.incomingKudosCollection = [];

        $scope.showMoreIncomingKudos = showMoreIncomingKudos;
        $scope.showLessIncomingKudos = showLessIncomingKudos;
        $scope.showMoreIncomingKudosButton = showMoreIncomingKudosButton;

        ReceivedAcornsService.incomingKudos().then(function (val) {
            $scope.incomingKudosCollection = val;
            showMoreIncomingKudosButton(val);
            receivedKudosTable();
        });

        function showMoreIncomingKudosButton(val) {
            if (val.length > 5) {
                $scope.moreIncoming = true;
            }
        }

        function showMoreIncomingKudos() {
            if ($scope.incomingKudosShowLimit <= $scope.incomingKudosCollection.length) {
                $scope.incomingKudosShowLimit += showMoreLimit;
            }
        }

        function showLessIncomingKudos() {
            $scope.incomingKudosShowLimit = showMoreLimit;
        }

        function receivedKudosTable() {
            if ($scope.incomingKudosCollection.length > 0)
                $scope.receivedKudosTable = true;
        }

    });