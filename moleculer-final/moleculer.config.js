"use strict"

module.exports = {
    namespace:"webhook",
    logger:true,
    loglevel:"info",
    metrics: false,
    tracing: {
        enabled: true,
        exporter: [{
            type: "Console",
            options: {
                width: 100,
                colors:true
            }
        }]
        
    },
    validator:true
}