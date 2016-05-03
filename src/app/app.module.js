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
        'myApp.components.sent',
        'myApp.components.received',
        'myApp.components.stream'
    ]);