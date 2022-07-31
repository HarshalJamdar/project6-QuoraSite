const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname : {
        type : String,
        requred : true
    },
    lname : {
        type : String,
        requred : true
    },
    email : {
        type : String,
        requred : true,
        unique : true
    },
    password : {
        type : String,
        requred : true
    },
    quetions : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "quetion"
    },
    answers : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "answer"
    },
    isDeleted: {
        type : Boolean,
        default: false
    }
},
{ timestamps : true}
)

module.exports = new mongoose.model("user",userSchema)