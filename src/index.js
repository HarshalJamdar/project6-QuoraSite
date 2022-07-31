const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const routes = require('./routes/route')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://HarshalJamdar:810Umakant@cluster0.wz2ii.mongodb.net/QueraProject",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is Connected"))
.catch(err=>console.log(err))

app.use('/',routes)

app.listen( process.env.PORT || 3000, function(){
    console.log("Express is connected at" +" "+(process.env.PORT || 3000))
})