const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const UserSchema = new Schema({
    //All Users 
    user_id: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    group_id: {
        type: ObjectId,
        required: true,
        ref: 'groups'
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