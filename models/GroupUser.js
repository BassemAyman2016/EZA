const mongoose = require('mongoose');
const User =require('./User');
var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema
const GroupUserSchema = new Schema({
    //All Users inside a cgroup 
  
    group_id: {
        type: ObjectId,
        required: true,
        ref: 'groups'
    },
    user_id:{
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    Pending:{
        type:Boolean,
        required:false
    }

})
module.exports = GroupUser = mongoose.model('group_users', GroupUserSchema)