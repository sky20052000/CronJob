require("dotenv").config();
const mongoose = require("mongoose");
 mongoose.connect(process.env.MONGO_URL).then((data)=>{
     console.log("Mongoose connected to database");
 }).catch((error)=>{
      console.log("Mongoose connection failed!",error)
 })
         
