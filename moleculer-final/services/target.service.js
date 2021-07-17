"use strict"

const { MoleculerClientError } = require('moleculer').Errors
const Dbservice = require('moleculer-db');
const MongooseAdapter = require('moleculer-db-adapter-mongoose');
const Webhook = require('../models/webhook.model')


module.exports = {
    name: "webhook",
    mixins: [Dbservice],
    adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost:27017/webhook", { useNewUrlParser: true, useUnifiedTopology: true }),
    model: Webhook,
    settings: {
        rest: "/",
        fields: ["id", "targetURL"],
        entityValidator: {
            id: { type: "number" },
            targetURL: { type: "string" }
        }
    },
    actions: {
        /**
         * Register a targetURL for the webhook
         * @param {Object} target
         * @param {String} targetURl
         * @returns {Object} newly created entity
         */
        register: {
            rest: "POST /register",
            params: {
                target: { type: "object" }
            },
            async handler(ctx) {
                let req = ctx.params.target

                if (req) {

                    const doc = await this.adapter.insert(req)
                    const json = await this.compatJSON(doc)
                    return json
                }
            }
        },
        /**
         * Update a targetURL for the webhook
         * @param {Object} target
         * @param {ObjectId} _id
         * @param {ObjectId} newTargetURL
         * @returns {Object} creation status
         */
        update: {
            rest: "PUT /update",
            params: {
                target: {
                    type: "object"
                }
            },
            async handler(ctx) {
                let req = ctx.params.target
                const res = await this.adapter.find({ query: { _id: req.id } })
                if (!res) {
                    throw new MoleculerClientError("Entry not found", 404, "", [{ field: "id", message: "not found" }])
                }
                const newData = {
                    targetURL: req.newTargetURL
                }
                const doc = await this.adapter.updateById(req.id, newData)

                return { "status": "updated", "statusCode": 200 }
            }
        },
        /**
        * List all the webhook targets
        * @returns {Object} targets
        */
        list: {
            rest: "GET /list",
            async handler(ctx) {
                const doc = await this.adapter.find()
                const json = await this.compatJSON(doc)
                return json
            }
        },
        /**
        * Fetch a single webhook target detail
        * @param {Object} target
        * @param {ObjectId} _id
        * @returns {Object} result
        */
        getOne: {
            rest: "POST /getone",
            params: {
                target: {
                    type: "object"
                }
            },
            async handler(ctx) {
                const req = ctx.params.target
                const res = await this.adapter.find({ query: { _id: req.id } })
                if (!res) {
                    throw new MoleculerClientError("id does not exists", 422, "", [{ field: "id" }])
                }
                return { res }
            }
        },
        /**
        * Delete the target of a webhook
        * @param {ObjectId} _id
        * @returns {Object} result
        */
        delete: {
            rest: "DELETE /delete/:id",
            async handler(ctx) {
                const req = ctx.params.id
                if (!req) {
                    throw new MoleculerClientError("id does not exists", 422, "", [{ field: "_id" }])
                }
                const doc = await this.adapter.removeById(req)
                return { "status": "doc deleted", "statusCode": 200 }
            }
        },
        /**
        * Update a targetURL for the webhook   
        * @param {String} ipAdddress  
        * @returns {Object} creation status
        */
        trigger: {
            rest: "POST /ip",
            params: {
                ipAddress: { type: "string" }
            },
            async handler(ctx) {

                const res = await ctx.call("webhook.list")
                let address = []
                res.doc.forEach(ele => {
                    address.push(ele.targetURL)
                });

                const payload = {
                    ipAddress: ctx.params.ipAddress,
                    time: Date.now()
                }

                return [address, payload]

            }

        }
    },
    methods: {
        /**
        * Helper function to convert the response to JSON
        */
        compatJSON(doc) {
            if (doc) {
                return { doc }
            }
        }
    }
}