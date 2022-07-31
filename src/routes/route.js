const express = require("express")
const router = express.Router()
const { userCreate,userLogin } = require("../controllers/userController")
const {postQuetion} = require("../controllers/quetionController")
const { authentication ,authorization} = require("../middlewere/auth")



//===Register User
router.post("/register",userCreate)

//===Login User
router.post("/login",userLogin)

router.post("/post/:userId",authentication,postQuetion)


module.exports=router