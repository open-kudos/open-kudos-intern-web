"use strict";
describe('Team Challenge', function() {
    var $scope = null;
    var ctrl = null;
    var temp,
        httpParamSerializer,
        $httpBackend;

    beforeEach(module('myApp'));

    module("myApp", function($provide) {
        $provide.provider("$translate", function() {
            this.$get = function(MockTranslate) {
                return MockTranslate.create(translations);
            }
        });
    });

    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $httpParamSerializer) {
        $scope = $rootScope.$new();

        ctrl = $controller('GiveTeamChallengeController', {
            $scope: $scope
        });

        httpParamSerializer = $httpParamSerializer;
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', 'app/translations/locale-en.json').respond();
        $httpBackend.when('POST', 'http://localhost:8080/user/list').respond();
    }));

    describe('Controller', function() {

        it('User should not be in array', function () {
            expect($scope.checkUser('name')).toEqual(false);
            $httpBackend.flush();
        });

        it('User should be already in array', function () {
            $scope.team1 = [
                'name',
                'surname'
            ];
            temp = $scope.team1.length;
            expect($scope.checkUser('name')).toBeTruthy();
            expect($scope.team1.length).toEqual(temp);
            $httpBackend.flush();
        });

        it('Should be possible to add new user to team 1', function () {
            $scope.teamChallengeParticipant = 'name';
            $scope.addUser('1');
            expect($scope.team1[0]).toBeTruthy();
            expect($scope.team1.length).toBeGreaterThan(0);
            $httpBackend.flush();
        });

        it('Should be possible to add new user to team 2', function () {
            $scope.teamChallengeParticipant = 'name';
            $scope.addUser('2');
            expect($scope.team2[0]).toBeTruthy();
            expect($scope.team2.length).toBeGreaterThan(0);
            $httpBackend.flush();
        });

        it('Should be possible to remove user', function () {
            $scope.team1 = [
                'name',
                'surname'
            ];
            temp = $scope.team1.length - 1;
            $scope.removeUser('name');
            expect($scope.team1[0]).toEqual('surname');
            expect($scope.team1.length).toEqual(temp);
            $httpBackend.flush();
        });

        describe('Validations should pass', function () {

            it('Name input validation', function () {
                $scope.giveTeamChallengeName = 'Name';
                $scope.giveTeamChallengeAmountOfKudos = 20;
                $scope.userKudos = 50;
                $scope.team1 = ['name'];
                $scope.team2 = ['surname'];
                expect($scope.validate()).toBeTruthy();

                $scope.giveTeamChallengeName = '';
                expect($scope.validate()).toBeFalsy();
                $httpBackend.flush();
            });

            it('Acorn input validation', function () {
                $scope.giveTeamChallengeName = 'Name';
                $scope.giveTeamChallengeAmountOfKudos = 20;
                $scope.userKudos = 50;
                $scope.team1 = ['name'];
                $scope.team2 = ['surname'];
                expect($scope.validate()).toBeTruthy();

                $scope.giveTeamChallengeAmountOfKudos = 50;
                $scope.userKudos = 20;
                expect($scope.validate()).toBeFalsy();

                $scope.giveTeamChallengeAmountOfKudos = 50;
                $scope.userKudos = 50;
                expect($scope.validate()).toBeTruthy();

                $scope.giveTeamChallengeAmountOfKudos = 0;
                $scope.userKudos = 0;
                expect($scope.validate()).toBeFalsy();
                $httpBackend.flush();
            });

            it('Team 1 validation', function () {
                $scope.giveTeamChallengeName = 'Name';
                $scope.giveTeamChallengeAmountOfKudos = 20;
                $scope.userKudos = 50;
                $scope.team1 = ['name'];
                $scope.team2 = ['surname'];
                expect($scope.validate()).toBeTruthy();

                $scope.team1 = '';
                expect($scope.validate()).toBeFalsy();
            });

            it('Team 2 validation', function () {
                $scope.giveTeamChallengeName = 'Name';
                $scope.giveTeamChallengeAmountOfKudos = 20;
                $scope.userKudos = 50;
                $scope.team1 = ['name'];
                $scope.team2 = ['surname'];
                expect($scope.validate()).toBeTruthy();

                $scope.team2 = '';
                expect($scope.validate()).toBeFalsy();
                $httpBackend.flush();
            });
        });
    });
/*
    describe('Service', function() {

        it('Should be possible to create team challenge', function () {
            $scope.giveTeamChallengeName = 'Name';
            $scope.giveTeamChallengeAmountOfKudos = 20;
            $scope.userKudos = 50;
            $scope.team1 = ['name'];
            $scope.team2 = ['surname'];

            var requestData = {
                name : $scope.giveTeamChallengeName,
                firstTeam : $scope.team1,
                secondTeam : $scope.team2,
                description : $scope.give TeamChallengeDescription,
                amount : $scope.giveTeamChallengeAmountOfKudos
            };

            $httpBackend.expect('GET', 'http://localhost:8080/challenges/created').respond(200, {});
            expect($httpBackend.flush).not.toThrow();
        });
    });*/
});