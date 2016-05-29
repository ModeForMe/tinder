"use strict";

var handlers = require('./handlers.js');

module.exports = [

    {
        method: 'GET',
        path: '/',
        handler: handlers.home
    },

    {
        method: 'GET',
        path: '/end',
        handler: handlers.end
    },

    {
        method: 'GET',
        path: '/api/{path*}',
        handler: handlers.api
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler:  {
            directory: {
                path: './'
            }
        }
    }
];
