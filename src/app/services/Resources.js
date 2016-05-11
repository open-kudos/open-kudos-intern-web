(function () {
    "use strict";
    angular.module("myApp")
        .service('Resources', function () {

            var outgoingKudosCollection = [];
            var incomingKudosCollection = [];
            var transactionsCollection = [];
            var notificationsTransactionCollection = [];
            var givenChallenges = [];
            var userAvailableKudos;
            var sentKudosTable;
            var receivedKudosTable;


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
                    if (outgoingKudosCollection.length > 0)
                        sentKudosTable = true;
                },
                getSentKudosTable: function () {
                    return sentKudosTable;
                },
                setReceivedKudosTable: function () {
                    if (incomingKudosCollection.length > 0)
                        receivedKudosTable = true;
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
                setGivenChallenges: function (val) {
                    givenChallenges = val;
                },
                getGivenChallenges: function () {
                    return givenChallenges;
                },
                setCurrentUserEmail: function (userEmail) {
                    currentUserEmail = userEmail;
                },
                getCurrentUserEmail: function () {
                    return currentUserEmail;
                },
                setLastTransactionTimestamp: function (timestamp) {
                    lastTransactionTimestamp = timestamp;
                    console.log(lastTransactionTimestamp);
                },
                getLastTransactionTimestamp: function () {
                    return lastTransactionTimestamp;
                },
                setNotificationsTransactionCollection: function (collection) {
                    notificationsTransactionCollection = collection;
                    console.log(collection.length);
                },
                getNotificationsTransactionCollection: function () {
                    console.log("FROM RETURN: " + notificationsTransactionCollection.length);
                    return notificationsTransactionCollection;
                }
            };
        });


})();