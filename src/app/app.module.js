/**
 * Created by vytautassugintas on 20/04/16.
 */
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
        'myApp.components.transactions'
    ]);