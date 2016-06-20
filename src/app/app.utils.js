/**
 * Created by vytautassugintas on 15/06/16.
 */

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