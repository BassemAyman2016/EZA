const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    //All Users 
    user_id: {
        type: String,
        required: true
    },
    group_id: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Likes: {
        type: Number,
        default: 0
    },
    Dislikes: {
        type: Number,
        default: 0
    },
    Created_At: {
        type: Date,
        default: Date.now
    },
    Deleted: {
        type: Boolean,
        default: false
    },
    Read: {
        type: Boolean,
        default: false
    },
})
module.exports = User = mongoose.model('posts', UserSchema)