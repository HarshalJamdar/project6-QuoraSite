const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const { isValidRequestBody,isValidFile, isValid, isValidObjectId, isValidEmail, isValidMobile, isValidName, isValidPassword } = require("../util/validators")


//---CREATE USER
    const userCreate = async function(req,res){
    try{
    let reqBody = req.body
     
    //==validating request body
    if(!isValidRequestBody(reqBody)) return res.status(400).send("Please provide Details!")
    let { fname,lname,email,password } = reqBody

    //==validating first name
    if(!fname) return res.status(400).send("First Name is mandetory!")
    if(!isValidName(fname)) return res.status(400).send("Please enter valid name.")

    //==validating last name
    if(!lname) return res.status(400).send("Last Name is mandetory!")
    if(!isValidName(fname)) return res.status(400).send("Please enter valid name.")

    //==validating email
    if(!email) return res.status(400).send("email is mandetory!")
    if(!isValidEmail(email)) return res.status(400).send("Please enter valid email.")
    let isUniqueEmail = await userModel.findOne({email : email})
    if(isUniqueEmail) return res.status(400).send("User with same email already exist!")
    
    //==validating password
    if(!password) return res.status(400).send("password is mandetory!")
    if(!isValidPassword(password)) return res.status(400).send("Please enter valid passward which includes one upper letter, one lower letter, one special character and of mimnimum 8 and maximum 15 character long.")

    //==password hashing
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)

    //==creating user
    let userCreated = await userModel.create({fname,lname,email,password})
    return res.status(201).send({status: true, msg : "Succesfully created.", data:userCreated})
     }catch(err){
        return res.status(500).send({ status: false, error: err.message })
     }
}



//---USER LOGIN
const userLogin = async function(req,res){
   try {
//==validating request body
    let requestBody = req.body
   if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details"})  
   const {email, password} = requestBody;

//==validating email
   if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mandatory field" })
   if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
      
//==validating password
   if(!isValid(password))return res.status(400).send({status:false, message: `Password is required`})
          
//==finding userDocument     
const user = await userModel.findOne({ email });

if (!user) {
   res.status(404).send({ status: false, message: `${email} related user unavailable` });
   return
}
const isLogin = await bcrypt.compare(password, user.password).catch(e => false)
if (!isLogin) {
   res.status(401).send({ status: false, message: `wrong email address or password` });
   return
}
       
//==creating token  
let token = jwt.sign(
   {
       userId:  user._id.toString(),
       iat: Math.floor(Date.now() / 1000),
       exp: Math.floor(Date.now() / 1000) + 96 * 60 * 60 //4days
   },
   "fncvfdgf"
);

//==sending and setting token
      res.header('Authorization',token);
      res.status(200).send({status:true, message:`User login successfully`, data:{token}});

  } catch (error) {
      res.status(500).send({status:false, message:error.message});
  }
}

//*******************************************************************//


module.exports = {userCreate,userLogin}