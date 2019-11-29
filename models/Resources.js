const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ResourceSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    group_id: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
})
module.exports = Resources = mongoose.model('resources', ResourceSchema)