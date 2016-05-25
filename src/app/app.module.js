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
            'myApp.acorn',
            'myApp.notification',
            'myApp.components.navbar',
            'myApp.components.notifications',
            'myApp.components.sentAcorns',
            'myApp.components.receivedAcorns',
            'myApp.components.givenChallenges',
            'myApp.components.challengeParticipated',
            'myApp.components.transactions',
            'myApp.components.giveKudos',
            'myApp.components.giveChallenge',
            'myApp.components.challengeOngoing',
            'myApp.components.topReceivers',
            'myApp.components.topSenders',
            'myApp.components.me',
            'myApp.components.wisdomWallIdeas',
            'myApp.components.addNewIdea',
            'myApp.acorn.leaderboard',
            'myApp.acorn.wisdomWall'
        ]);
})();