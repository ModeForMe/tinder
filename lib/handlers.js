"use strict";

var api = require("./api.js");

module.exports = {

    home: function(request, reply) {
        reply.file('./public/views/index.html');
    },

    api: function(request, reply) {
        var path = request.url.pathname.split("/")[2];

        if (path === "products") {
            var term = request.url.pathname.split("/")[3];

            if (term === "random") {

                api.getRandomProduct(function(err, data) {
                    if (err) {
                        console.log("Error in api handler: ", err);

                    } else {
                        reply(data);
                    }
                });
                
            } else {
                var productId = request.url.pathname.split("/")[3];
                var action = request.url.pathname.split("/")[4];

                if (action === "like") {

                    api.increaseLikes(productId, function(err, response) {
                        if (err) {
                            console.log("Error in api handler: ", err);

                        } else {
                            reply(response);
                        }

                    });
                }
            }

        }

    }

};
