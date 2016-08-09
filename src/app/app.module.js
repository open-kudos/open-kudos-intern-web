(function () {
    angular
        .module('myApp', [
            'ngRoute',
            'pascalprecht.translate',
            'myApp.login',
            'myApp.registration',
            'myApp.profile',
            'myApp.notification',
            'myApp.settings',
            'myApp.edit-user',
            'myApp.shop',
            'myApp.history',
            'myApp.components.navbar',
            'myApp.components.completedChallenges',
            'myApp.components.challengeNew',
            'myApp.components.transactions',
            'myApp.components.giveKudos',
            'myApp.components.giveChallenge',
            'myApp.components.challengeOngoing',
            'myApp.components.confirm-email',
            'myApp.components.me',
            'myApp.components.wisdomWallIdeas',
            'myApp.components.relationship',
            'myApp.components.relationship.feed',
            'myApp.components.info',
            'myApp.components.feed',
            'myApp.components.feed.challenge',
            'myApp.components.feed.comment',
            'myApp.components.feed.idea',
            'myApp.components.feed.relation',
            'myApp.components.feed.transaction',
            'myApp.components.leaderboard',
            'myApp.components.following',
            'myApp.components.challenges-panel',
            'myApp.components.challenges-comment',
            'myApp.components.history'
        ]);
})();