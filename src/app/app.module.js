/**
 * Created by vytautassugintas on 20/04/16.
 */
angular
    .module('myApp', [
        'ngRoute',
        'ngAnimate',
        'pascalprecht.translate',
        'myApp.login',
        'myApp.registration',
        'myApp.profile',
        'myApp.version',
        'myApp.components',
        'myApp.components.challengeParticipated'
    ]);