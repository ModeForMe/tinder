var client = require("./db.js");

var api = {

    getAllProductNames: function(callback) {

        client.smembers("products", function(err, data) {
            if (err) {
                callback(err, null);

            } else {
                callback(null, data);
            }

        });
    },

    getAllProducts: function(callback) {
        var allProductData = [];
        var counter = 0;

        api.getAllProductNames(function(err, productNames) {

            productNames.forEach(function(name) {

                client.hgetall(name, function(hashErr, productData) {
                    if (hashErr) {
                        callback(hashErr, null);

                    } else {

                        allProductData.push(productData);
                        counter++;

                        if (counter === productNames.length) {
                            callback(null, allProductData);
                        }

                    }

                });

            });

        });
    },

    getRandomProduct: function(callback) {

        api.getAllProductNames(function(err, productNames) {
            var numberOfProducts = productNames.length;
            var randomNumber = Math.floor(Math.random() * numberOfProducts) + 1;

            if (err) {
                callback(err, null);

            } else {
                client.hgetall(randomNumber, function(hashErr, productData) {
                    if (hashErr) {
                        callback(hashErr, null);

                    } else {
                        callback(null, productData);
                    }

                });

            }



        });

    },

    increaseLikes: function(productId, callback) {

        client.hincrby(productId, "likes", 1, function(err, response) {
            if (err) {
                callback(err, null);

            } else {
                callback(null, response);
            }
        });
    },

    increaseSkips: function(productId, callback) {

        client.hincrby(productId, "skips", 1, function(err, response) {
            if (err) {
                callback(err, null);

            } else {
                callback(null, response);
            }
        });
    }

};

module.exports = api;
