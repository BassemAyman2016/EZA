const mongoose = require('mongoose');
const Schema = mongoose.Schema
const NotificationSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    group_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    reply_id: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
})
module.exports = Notification = mongoose.model('notifications', NotificationSchema)