(function () {
    angular.module('myApp.components.sentAcorns', [])
        .component('kudosSentAcorns', {
            templateUrl: 'app/components/kudos-sent-acorns/kudos-sent-acorns.html',
            controller: 'SentAcornsController'
        })
        .controller('SentAcornsController', function ($scope, SentAcornsService, Resources) {

        var showMoreLimit = 5;
        $scope.outgoingKudosShowLimit = 5;

            $scope.showMoreOutgoingKudos = showMoreOutgoingKudos;
            $scope.showLessOutgoingKudos = showLessOutgoingKudos;
            $scope.showMoreOutgoingKudosButton = showMoreOutgoingKudosButton;
            $scope.acornPlural = acornPlural;

            SentAcornsService.outgoingKudos().then(function (val) {
                Resources.setOutgoingKudosCollection(val);
                $scope.outgoingKudosCollection = Resources.getOutgoingKudosCollection();
                Resources.setSentKudosTable();
                $scope.sentKudosTable = Resources.getSentKudosTable();
                showMoreOutgoingKudosButton(val);
            });

            function showMoreOutgoingKudosButton(val) {
                if (val.length > 5) {
                    $scope.moreOutgoing = true;
                }
            }

            function showMoreOutgoingKudos() {
                if ($scope.outgoingKudosShowLimit <= Resources.getOutgoingKudosCollection().length) {
                    $scope.outgoingKudosShowLimit += showMoreLimit;
                }
            }

            function showLessOutgoingKudos() {
                $scope.outgoingKudosShowLimit = showMoreLimit;
            }

            function acornPlural(amount) {
                return amount > 1 ? amount + " Acorns" : amount + " Acorn"
            }
        });
})();