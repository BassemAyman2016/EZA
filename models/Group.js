const mongoose = require('mongoose');
const Schema = mongoose.Schema
const GroupSchema = new Schema({
    //All Users 
    Name: {
        type: String,
        required: true
    },
    Discription:{
        type:String,
        required:false
    },
    Created_By: {
        type: String,
        required: false
    }
   

})
module.exports = Group = mongoose.model('groups', GroupSchema)