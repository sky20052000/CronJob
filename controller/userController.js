const User = require("../models/userModels");
const validator = require("validator");
const cronJob = require("node-cron");
const SendMail = require("../utils/sendEmail");

const addUser = async(req,res)=>{
      try{
        let {name, email,password} = req.body;
          if(!(name && email && password)){
             return res.status(400).json({success:false, message:"Manadatory fields can not be empty"});
          }

          // check valid email 
           const validEmail = validator.isEmail(email);
            if(!validEmail){
                 return res.status(400).json({success:false, message:"Please enter valid email"});
            }


            const findUser = await User.findOne({email});
               if(findUser){
                return res.status(400).json({success:false, message:"Please login with credentails"});
               }
                // save user 
                 let newUser = {
                     name,
                     email,
                     password
                 }

                 await User.create(newUser);
                  return res.status(201).json({
                    success:true,
                    message:"User register successfully"
                  });
        
      }catch(e){
               console.log(e,"ee")
            return res.status(500).json({
                success:false,
                message:"Something went wrong!"
            });
      }
}
const  loginUser = async(req,res)=>{
            try{
                const {email,password} =  req.body;
                if(!(email && password)){
                  return res.status(400).json({success:false, message:"Manadatory fields can not be empty"});
               }
     
               // check valid email 
                const validEmail = validator.isEmail(email);
                 if(!validEmail){
                      return res.status(400).json({success:false, message:"Please enter valid email"});
                 }

                 // const find user 
                 const find_User =  await User.findOne({email});
                 if(!find_User){
                  return res.status(400).json({success:false, message:"User does not exists!"});
                 }

                 // compare password 
                 const isMatchPassword = await find_User.comparePassword(password);
                  if(!isMatchPassword){
                     return res.status(400).json({success:false, message:"Password mismatch!"});
                  }

                          let userData = {
                            id:find_User._id,
                            name:find_User.name,
                            email:find_User.email
                          }
                  // generate token 
                  const token = await find_User.generateToken();
                    return res.status(200).json({
                     sucess:true,
                     data:userData,
                     token:token
                    })  ;


            }catch(e){
               console.log(e,"ee")
               return res.status(500).json({
                   success:false,
                   message:"Something went wrong!"
               });
            }
}

const sendMailToAllUser = async(req,res)=>{
             try{
                cronJob.schedule('*/2 * * * * *',async()=>{
                      const findUser = await User.find({});
                       if(findUser.length>0){
                          let emails = [];
                          findUser.map((ele)=>{
                            emails.push(ele.email)
                          })
                       const sendEmail= await SendMail(emails);
                             if(!sendEmail){
                                return res.status(400).json({success:false,message:"Email not sent"});  
                             }
                           return res.status(200).json({success:true,message:"Email successfully sent"});
                       }else{
                           return res.status(200).json({success:true,message:"No user email present in database"});
                       }
                })

             }catch(e){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong!"
                });
             }
}


const importCsvFile =  async(req,res)=>{
   try{
      cronJob.schedule('*/2 * * * * *',async()=>{
            const findUser = await User.find({});
             if(findUser.length>0){
                let emails = [];
                findUser.map((ele)=>{
                  emails.push(ele.email)
                })
             const sendEmail= await SendMail(emails);
                   if(!sendEmail){
                      return res.status(400).json({success:false,message:"Email not sent"});  
                   }
                 return res.status(200).json({success:true,message:"Email successfully sent"});
             }else{
                 return res.status(200).json({success:true,message:"No user email present in database"});
             }
      })

   }catch(e){
      return res.status(500).json({
          success:false,
          message:"Something went wrong!"
      });
   }
}

module.exports = {
    addUser,
    loginUser,
    sendMailToAllUser,
    importCsvFile
}