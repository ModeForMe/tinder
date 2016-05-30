"use strict";

var handlers = require('./handlers.js');

module.exports = [

    {
        method: 'GET',
        path: '/',
        handler: handlers.home,
        config: {
            state: {
                parse: false, // don't store incoming cookie headers in request.state
                failAction: 'ignore'
            }
        }
    },

    {
        method: 'GET',
        path: '/end',
        handler: handlers.end,
        config: {
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },

    {
        method: 'GET',
        path: '/api/{path*}',
        handler: handlers.api,
        config: {
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    },

    {
        method: 'GET',
        path: '/static/{path*}',
        handler:  {
            directory: {
                path: './'
            }
        },
        config: {
            state: {
                parse: false,
                failAction: 'ignore'
            }
        }
    }
];
