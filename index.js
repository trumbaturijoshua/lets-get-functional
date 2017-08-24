#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-trumbaturijoshua");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
 
 /**
  * malesInCustomers: Designed to loop through the profiles in the customers array. Has a count
  * that increases by one whenever it passes over a male customer.
  * 
  * @param {Array} collection: customers.json; array of objects
  * 
  * @return: Returns the amount of males in customers.json through the count variable.
  */
function malesInCustomers(collection) {
    let count = 0;
    _.each(collection, function(element, i, array) {
        if (element.gender === 'male') {
            count += 1;
        }
    });
    return count;
}

console.log(malesInCustomers(customers));

/**
 * femalesInCustomers: Designed to loop through the profiles in the customers array. Has a count
 * that increases by one whenever it passes over a female customer.
 * 
 * @param {Array} collection: customers.json; array of objects
 * 
 * @return: Returns the amount of females in customers.json through the count variable.
 */
function femalesInCustomers(collection) {
    let count = 0;
    _.each(customers, function(element, i, array) {
        if (element.gender === 'female') {
            count += 1;
        }
    });
    return count;
}

console.log(femalesInCustomers(customers));

/**
 * 
 * 
 */
function oldestCustomer(collection) {
    let customersAges = [];
    let customersName = [];
    let oldCustomer = {};
    _.each(collection, function(element, i, collection) {
      customersAges.push(element.age); 
    });
    customersAges.sort(function(a, b){return a-b});
    _.each(collection, function(element, i, collection) {
        if (element.age === customersAges[customersAges.length - 1]) {
            customersName.push(element.name);
        }
    });
    oldCustomer.name = customersName;
    oldCustomer.age = _.last(customersAges, customersAges.length);
    return oldCustomer;
}

console.log(oldestCustomer(customers));

// /**
//  * 
//  * 
//  */
function youngestCustomer(collection) {
    let customersAges = [];
    let customersName = [];
    let youngCustomer = {};
    _.each(collection, function(element, i, collection) {
      customersAges.push(element.age); 
    });
    customersAges.sort(function(a, b){return a-b});
    _.each(collection, function(element, i, collection) {
        if (element.age === customersAges[0]) {
            customersName.push(element.name);
        }
    });
    youngCustomer.name = customersName;
    youngCustomer.age = _.first(customersAges, 1);
    return youngCustomer;
}

console.log(youngestCustomer(customers));

/**
 * 
 * 
 */
function averageBalance(collection) {
    let customBalance = [];
    _.each(collection, function(element, i, array) {
        if (element.balance){
            let string = element.balance;
            let number = string.substring(1).replace(',', '');
            customBalance.push(parseFloat(number));
        }
    });
    let customersBalance = _.reduce(customBalance, function(previousSum, currentValue, currentIndex){
        return previousSum + currentValue;
    });
    return (customersBalance / customers.length).toFixed(2);
}

console.log(averageBalance(customers));

/**
 * 
 * 
 */
function namesBeginWith(collection, letter) {
    let names = [];
    _.each(collection, function(element, i, array) {
        names.push(element.name);
    });
    let howMany = _.filter(names, function(element, i, array) {
        if (element[0].toLowerCase() === letter.toLowerCase()) {
            return true;
        }
        return false;
    });
    return howMany.length;
}

console.log(namesBeginWith(customers, 'd'));

/**
 * 
 * 
 */
function friendsNamesBeginWith(collection, letter) {
    let allFriendsNames = [];
    let allFriends = [];
    _.each(collection, function(element, i, array) {
        let customersFriends = [];
        _.each(element.friends, function(element, i, array) {
            customersFriends.push(element.name);
        });
        allFriendsNames.push(customersFriends);
    });
    allFriends = [].concat.apply([], allFriendsNames);
    let uniqueFriends = _.unique(allFriends);
    let howMany = _.filter(uniqueFriends, function(element, i, array) {
        if (element[0].toLowerCase() === letter.toLowerCase()) {
            return true;
        }
        return false;
    });
    return howMany.length;
}

console.log(friendsNamesBeginWith(customers, 'c'));

/**
 * 
 * 
 */
function friendsWithWho(collection, friend) {
    let friendsWithMe = [];
    _.each(collection, function(element, i, collection) {
        let thisName = _.pluck(element.friends, "name")
        if (_.contains(thisName, friend)) {
            friendsWithMe.push(element.name);
        }
    });
    return friendsWithMe;
}

console.log(friendsWithWho(customers, "Cooley Jimenez"));

/**
 * 
 * 
 */
function topThreeTags(collection) {
    var commonTags = [];
    var allTags = [];
    _.each(collection, function (e,i,c) {
        commonTags.push(e.tags);
    });
    allTags = [].concat.apply([],commonTags);
    
    let count = allTags.reduce(function(num, tag){
    num[tag] = (num[tag] || 0) + 1;
    return num;
    } , {});
    
    let resultArray = [];
    
    for (var key in count) {
        if (count[key] > 2) {
            resultArray.push(key);
        }
    }
    
    return resultArray.slice(0, 3);
}

console.log(topThreeTags(customers));

/**
 * 
 * 
 */
function genderSummary(collection) {
    let customerGenders = _.pluck(collection, "gender");
    let count = customerGenders.reduce(function(num, sex) {
        num[sex] = (num[sex] || 0) + 1;
        return num;
    }, {});
    return count;
}

console.log(genderSummary(customers));