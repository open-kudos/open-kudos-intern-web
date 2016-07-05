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
            'myApp.components.completedChallenges',
            'myApp.components.challengeNew',
            'myApp.components.transactions',
            'myApp.components.giveKudos',
            'myApp.components.giveChallenge',
            'myApp.components.giveChallengeSmall',
            'myApp.components.giveTeamChallenge',
            'myApp.components.challengeOngoing',
            'myApp.components.topReceivers',
            'myApp.components.topSenders',
            'myApp.components.confirm-email',
            'myApp.components.me',
            'myApp.components.wisdomWallIdeas',
            'myApp.components.addNewIdea',
            'myApp.acorn.leaderboard',
            'myApp.components.relationship',
            'myApp.components.info',
            'myApp.components.feed',
            'myApp.components.userHistory',
            'myApp.components.leaderboardFilter'
        ]);
})();