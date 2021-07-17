"use strict";

const _ = require('lodash')
const ApiGateway = require('moleculer-web')
const { UnAuthorizedError } = ApiGateway.Errors

module.exports = {
    name: "api",
    mixins: [ApiGateway],

    settings: {
        port: process.env.PORT || 3000,
        routes: [{
            path: "/api",

            authorization: true,
            autoAliases: true,

            // Set CORS headers
            cors: true,

            // Parse body content
            bodyParsers: {
                json: {
                    strict: false
                },
                urlencoded: {
                    extended: false
                }
            },
            callingOptions: {
                timeout: 500,
                retries: 5

            }

        }],
        
    }
}