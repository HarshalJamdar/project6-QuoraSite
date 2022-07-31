const quetionModel = require("../models/quetionModel")
const { isValidRequestBody,isValidFile, isValid, isValidObjectId, isValidEmail, isValidMobile, isValidName, isValidPassword } = require("../util/validators")


//==Post Quetion
const postQuetion = async function(req,res){
try{
    let reqBody = req.body
     
    //==validating request body
    if(!isValidRequestBody(reqBody)) return res.status(400).send("Please provide Details!")
    reqBody.user = req.params.userId
   console.log(reqBody)
    let quetion = await quetionModel.create(reqBody)
    return res.status(201).send({status: true, msg : "Succesfully created.", data:quetion})
    
}catch(err){
    return res.status(500).send({ status: false, error: err.message })
}
}

module.exports={postQuetion}