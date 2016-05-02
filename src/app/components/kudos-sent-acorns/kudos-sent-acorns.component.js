angular.module('myApp.components', [])
    .component('kudosSentAcorns', {
        templateUrl: 'app/components/kudos-sent-acorns/kudos-sent-acorns.html',
        controller: 'SentAcornsController'
    })
    .controller('SentAcornsController', function ($scope, SentAcornsService) {

        var showMoreLimit = 5;
        $scope.outgoingKudosShowLimit = 5;
        $scope.outgoingKudosCollection = [];

        $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;
        $scope.showLessOutgoingKudos = showLessOutgoingKudos;
        $scope.showMoreOutgoingKudosButton = showMoreOutgoingKudosButton;

        SentAcornsService.outgoingKudos().then(function (val) {
            $scope.outgoingKudosCollection = val;
            showMoreOutgoingKudosButton(val);
            sentKudosTable();
        });

        function showMoreOutgoingKudosButton(val) {
            if (val.length > 5) {
                $scope.moreOutgoing = true;
            }
        }

        function showMoreOutgoingKudos() {
            if ($scope.outgoingKudosShowLimit <= $scope.outgoingKudosCollection.length) {
                $scope.outgoingKudosShowLimit += showMoreLimit;
            }
        }

        function showLessOutgoingKudos() {
            $scope.outgoingKudosShowLimit = showMoreLimit;
        }

        function sentKudosTable() {
            if ($scope.outgoingKudosCollection.length > 0)
                $scope.sentKudosTable = true;
        }
    });