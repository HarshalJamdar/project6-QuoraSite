const mongoose = require("mongoose")

const quetionSchema = new mongoose.Schema({
    quetion : {
        type : String,
        required : true,
        trim : true
    },
    isDeleted: {
        type : Boolean,
        default: false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    answers : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "answer"
    },
    answerCount : {
        type : Number,
        default : 0
    }
},
{ timestamps: true }
)
module.exports = new mongoose.model("quetion",quetionSchema)