(function () {
    "use strict";
    angular.module("myApp")
        .service('Resources', function () {

            var outgoingKudosCollection = [];
            var incomingKudosCollection = [];
            var transactionsCollection = [];
            var notificationsTransactionCollection = [];
            var usersCollection = [];
            var completedChallenges = [];
            var topReceivers = [];
            var topSenders = [];
            var userAvailableKudos;
            var sentKudosTable;
            var receivedKudosTable;
            var currentUser;
            var ongoingChallenges = [];
            var newChallenges = [];


            var lastTransactionTimestamp;
            var currentUserEmail;

            return {
                getOutgoingKudosCollection: function () {
                    return outgoingKudosCollection;
                },
                setOutgoingKudosCollection: function (val) {
                    outgoingKudosCollection = val;
                },
                getIncomingKudosCollection: function () {
                    return incomingKudosCollection;
                },
                setIncomingKudosCollection: function (val) {
                    incomingKudosCollection = val;
                },
                setSentKudosTable: function () {
                    if (outgoingKudosCollection.length > 0) {
                        sentKudosTable = true;
                    } else {
                        sentKudosTable = false;
                    }
                },
                getSentKudosTable: function () {
                    return sentKudosTable;
                },
                setReceivedKudosTable: function () {
                    if (incomingKudosCollection.length > 0) {
                        receivedKudosTable = true;
                    } else {
                        receivedKudosTable = false;
                    }
                },
                getReceivedKudosTable: function () {
                    return receivedKudosTable;
                },
                setUserAvailableKudos: function (val) {
                    userAvailableKudos = val;
                },
                getUserAvailableKudos: function () {
                    return userAvailableKudos;
                },
                setCompletedChallenges: function (val) {
                    completedChallenges = val;
                },
                getCompletedChallenges: function () {
                    return completedChallenges;
                },
                setCurrentUserEmail: function (userEmail) {
                    currentUserEmail = userEmail;
                },
                getCurrentUserEmail: function () {
                    return currentUserEmail;
                },
                setLastTransactionTimestamp: function (timestamp) {
                    lastTransactionTimestamp = timestamp;
                },
                getLastTransactionTimestamp: function () {
                    return lastTransactionTimestamp;
                },
                setNotificationsTransactionCollection: function (collection) {
                    notificationsTransactionCollection = collection;
                },
                getNotificationsTransactionCollection: function () {
                    return notificationsTransactionCollection;
                },
                setCurrentUser: function (user) {
                    currentUser = user;
                },
                getCurrentUser: function () {
                    return currentUser;
                },
                getOngoingChallenges: function () {
                    return ongoingChallenges;
                },
                setOngoingChallenges: function (val) {
                    ongoingChallenges = val;
                },
                getUsersCollection: function () {
                    return usersCollection;
                },
                setUsersCollection: function (val) {
                    usersCollection = val;
                },
                setNewChallenges: function (val) {
                    newChallenges = val;
                },
                getNewChallenges: function () {
                    return newChallenges;
                },
                getTopReceivers: function () {
                    return topReceivers;
                },
                setTopReceivers: function (val) {
                    topReceivers = val;
                },
                getTopSenders: function () {
                    return topSenders;
                },
                setTopSenders: function (val) {
                    topSenders = val;
                }
            };
        });


})();