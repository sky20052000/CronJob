  require("./middleware/databaseCon")
  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
 

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cors());

  // set Routes 
  const userRoutes = require("./routes/userRoutes");
  app.use("/api/user", userRoutes);

  app.listen(process.env.PORT,()=>{
     console.log(`Server listeing on the:${process.env.HOST_URL}:${process.env.PORT}`)
  })