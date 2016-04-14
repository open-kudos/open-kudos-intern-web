/**
 * Created by vytautassugintas on 06/04/16.
 */
'use strict';

angular.module('myApp.profile', ['ngRoute', 'ngCookies', 'angucomplete'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'profileController'
        });
    }])

    .controller('profileController', function ($http, $scope, $window, $cookies, ProfileService) {
        var selectedLanguage = $cookies.get('language');
        $scope.changeLanguageToLT = changeLanguageToLT;
        $scope.changeLanguageToENG = changeLanguageToENG;
        console.log($scope.people);
        // Test
        initView();
        checkUser();

        $scope.sendKudosErrorMessage = "";

        $scope.incomingKudosCollection = [];
        $scope.outgoingKudosCollection = [];
        $scope.usersCollection = [];
        $scope.updateProfile = updateProfile;
        $scope.logout = logout;
        $scope.sendKudos = sendKudos;
        $scope.isValid = isValid;

        ProfileService.userHome().then(function (val) {
            var user = val.user;
            $scope.userEmail = user.email;
            $scope.userName = user.firstName;
            $scope.userSurname = user.lastName;
            $scope.userPhone = user.phone;
            $scope.userPosition = user.position;
            $scope.userLocation = user.location;
            $scope.userTeam = user.team;
            $scope.userStartedToWork = user.startedToWorkDate;
            $scope.userBirthday = user.birthday;
        });

        ProfileService.remainingKudos().then(function (val) {
            $scope.userKudos = val;
        });

        ProfileService.receivedKudos().then(function (val) {
            $scope.userReceivedKudos = val;
        });

        ProfileService.incomingKudos().then(function (val) {
            $scope.incomingKudosCollection = val;
        });

        ProfileService.outgoingKudos().then(function (val) {
            $scope.outgoingKudosCollection = val;
        })

        ProfileService.listUsers().then(function (val){
            $scope.usersCollection = val.userList;
            console.log($scope.usersCollection);
        });

        function updateProfile() {
            var updateInfo = $.param({
                birthday: this.birthday,
                department: this.department,
                location: this.location,
                phone: "",              // <-- TODO FIX PHONE
                position: this.position,
                startToWork: this.startToWork,
                team: this.team
            });
            ProfileService.update(updateInfo).then(function (val) {
                $('#userDetailsModal').modal('hide');
                checkUser();
            })
        }

        function sendKudos() {
            if (isValid($scope.selectedPerson)){
                $scope.sendKudosErrorMessage = "Something went wrong"
            }else {
                var sendTo = $.param({
                    receiverEmail: $scope.selectedPerson.originalObject.email,
                    amount: $scope.sendKudosAmount,
                    message: $scope.sendKudosMessage
                });
            }

            ProfileService.send(sendTo).then(function () {
                $('#sendKudosModal').modal('hide');
            }).catch(function (val) {
                if (val.status === 400){
                    $scope.sendKudosErrorMessage = "Enter receiver";
                }
                if (val.status === 500){
                    $scope.sendKudosErrorMessage = "Enter amount";
                }
            });
        }

        function checkUser() {
            ProfileService.checkUser().then(function (val) {
                val.logged ? $window.location.href = "#/profile" : $window.location.href = "#/login";
            });
        }

        function logout() {
            clearCookies();
            ProfileService.logout().catch(function (val) {
                $window.location.href = "#/login";
            });
        }

        function clearCookies() {
            $cookies.put('remember_user', 'false');
            $cookies.put('user_credentials', '');
        }

        function isValid(value){
            if (typeof value !== "undefined"){
                return false;
            } else {
                return true;
            }
        }
        /**
         ************************ Set language section ***********************
         */
        function initView() {
            if (selectedLanguage == null) {
                $cookies.put('language', 'en');
                setLanguage('en');
                selectedLanguage = $cookies.get('language');
                hideEnButton();
            } else {
                selectedLanguage == 'lt' ? hideLtButton() : hideEnButton();
                setLanguage(selectedLanguage);
            }
        }

        function changeLanguageToLT() {
            setLanguage('lt');
            $cookies.put('language', 'lt');
            hideLtButton();
        }

        function changeLanguageToENG() {
            setLanguage('en');
            $cookies.put('language', 'en');
            hideEnButton();
        }

        function setLanguage(language) {
            $http.get('../app/translations/' + language + '.json').success(function (data) {
                $scope.language = data;
            })
        }

        function hideLtButton(){
            document.getElementById('enButton').className = 'btn btn-sm';           // TODO Please do this in angular way
            document.getElementById('ltButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
        }

        function hideEnButton(){
            document.getElementById('enButton').className = 'btn btn-sm hidden';    // TODO Please do this in angular way
            document.getElementById('ltButton').className = 'btn btn-sm';           // TODO Please do this in angular way
        }
        /**
         *  ****************** End of language section ***********************
         */

    });