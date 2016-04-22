'use strict';
angular
    .module("myApp")
    .controller('AppController', AppController);

function AppController($scope, $translate, $cookies){

    $scope.changeLanguage = changeLanguage;
    $scope.languageButtons = languageButtons;

    $scope.languageButtons($cookies.get('NG_TRANSLATE_LANG_KEY'));

    function changeLanguage(key) {
        $translate.use(key);
    }

    function languageButtons(language) {
        if (language == '"en"') {
            $scope.lt = false;
            $scope.en = true;
        } else if (language == '"lt"') {
            $scope.lt = true;
            $scope.en = false;
        }
    }
}

