/**
 * Created by vytautassugintas on 20/04/16.
 */
(function () {
    angular
        .module('myApp', [
            'ngRoute',
            'pascalprecht.translate',
            'myApp.login',
            'myApp.registration',
            'myApp.profile',
            'myApp.version',
            'myApp.components.sentAcorns',
            'myApp.components.receivedAcorns',
            'myApp.components.givenChallenges',
            'myApp.components.challengeParticipated',
            'myApp.components.transactions',
            'myApp.components.giveKudos',
            'myApp.components.challengeReferee',
            'myApp.components.transactions'
        ]);
})();