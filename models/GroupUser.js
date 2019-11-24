const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema
const GroupUserSchema = new Schema({
    //All Users inside a cgroup 
  
    group_id: {
        type: ObjectId,
        required: true
    },
    user_id:{
        type: ObjectId,
        required: true
    },
    Pending:{
        type:Boolean,
        required:false
    }

})
module.exports = GroupUser = mongoose.model('group_users', GroupUserSchema)