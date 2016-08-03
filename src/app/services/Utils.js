(function () {

    angular
        .module("myApp")
        .service("Utils", Utils);

    function Utils() {
        var utils = {
            isEmptyCollection: isEmptyCollection,
            validateEmail: validateEmail,
            acornPlural: acornPlural,
            trimDate: trimDate,
            isValid: isValid,
            split: split,
            lengthLimit: lengthLimit,
            symbolsLeft: symbolsLeft,
            convertDate: convertDate
        };
        return utils;

        function isEmptyCollection(collection) {
            return collection.length == 0;
        }

        function validateEmail(email) {
            var reg = /[@]swedbank.[a-z]{2,}/;
            return reg.test(email);
        }

        function acornPlural(amount) {
            return amount > 1 ? amount + " Acorns" : amount + " Acorn"
        }

        function trimDate(dateString) {
            return dateString.substring(0, 16);
        }

        function isValid(value) {
            return typeof value === "undefined";
        }

        function split(splitValue, splitMark) {
            return splitValue.split(splitMark);
        }
        
        function lengthLimit(input, length) {
            if (input) {
                while (input.charAt(0) == ' ')
                    input = input.slice(1);
                while (input.length > length)
                    input = input.slice(0, -1);
                return input;
            }
        }

        function symbolsLeft(input, length) {
            if (input)
                return length - input.length;
            else return length;
        }

        function convertDate(val) {
            if (val) {
                val = val.split(":");
                val = val[0] + ":" + val[1];
                return val;
            }
        }

    }
})();