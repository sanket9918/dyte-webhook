let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let webhookSchema = new Schema({
    /**
     * TargetURL Schema for the webhook
     */
    targetURL: {
        type: String
    }
})
module.exports = mongoose.model("Webhook", webhookSchema)