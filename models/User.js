const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema({
    //All Users 
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Join_Date: {
        type: Date,
        default: Date.now
    },
    Updated_At: {
        type: Date,
        default: Date.now
    },
    Deleted: {
        type: Boolean,
        default: false
    },
    User_Category: {
        type: String,
        enum: ['Admin', 'Doctor', 'TA', 'Student'],
        required: true
    },
    phone_number: {
        type: String,
        required: false
    },
    First_Name: {
        type: String,
        required: false
    },
    Last_Name: {
        type: String,
        required: false
    },
    Birth_Date: {
        type: Date,
        required: false
    },
    // If Student 
    student_id: {
        type: String,
        required: false
    }




})
module.exports = User = mongoose.model('users', UserSchema)