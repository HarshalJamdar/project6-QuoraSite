const mongoose = require("mongoose")

const answersSchema = new mongoose.Schema({
    quetion : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "quetion"
    },
    answer : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        default: "Anynomous",
        ref : "user"
    },
    isDeleted: {
        type : Boolean,
        default: false
    }
},
{timestamps :  true}
)

module.exports = new mongoose.model("answer",answersSchema)