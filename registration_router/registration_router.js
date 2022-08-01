const express = require("express");
const signup_router =express.Router();
const registration_schema= require("../db/registration_schema")
const registration_joi = require("../joi_validation/registration_joi")
const login_joi = require("../joi_validation/login_joi")
const bcrypt = require("bcrypt");
let date = new Date();



signup_router.post("/registration", async (req,res)=>{
    let {error, value}= registration_joi.registration_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})
    }
    else{
        let salt = await bcrypt.genSalt()
        let haspassword = await bcrypt.hash(req.body.Password,salt)
        let bcrypt_data ={
            Frist_name:req.body.Frist_name,
            Last_name:req.body.Last_name,
            Email_id:req.body.Email_id,
            Password:haspassword,
        }
        let data_insert = new registration_schema(bcrypt_data)
        data_insert.save().then(response=>{
            res.json(response)
        }).catch(error=>{
            res.json(error.message)
        })


    }

    })
signup_router.post("/user/login", async (req,res)=>{
let {error,value} = await login_joi.login_joi.validate(req.body)
   if(error){
    res.send({message:error.message})
   }
   else{
     let Email_id= await registration_schema.find({"Email_id":req.body.Email_id})
     
     if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
    try{
        if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
            let session_token = await registration_schema.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             if(session_token != 0){
                res.json({"message":"This user already logged in another device"})
            }
            else{
                 
                 let seconds = date.getSeconds();
                 let session_token_creation=req.body.Email_id.concat(seconds)
                 
                const seesion= await registration_schema.updateOne({"Email_id":req.body.Email_id},{$set:{"session_token":session_token_creation}})
                res.json({"message":"login successful"})
            }
        }else{
              res.send("not allowed")
        }
    }catch{
        res.status(500).send()
    }
}

   }
})


signup_router.post("/user/logout",async (req,res)=>{
    let Email_id= await registration_schema.find({"Email_id":req.body.Email_id})
    if(Email_id == null){
       return req.status(401).send("cannot find Email")
     }
     else{
        try{
           if(await bcrypt.compare(req.body.Password, Email_id[0].Password)){
             let session_token = await registration_schema.find({session_token:{$exists:true}, "Email_id":req.body.Email_id})
             console.log(session_token);
             if(session_token  != 0){
                const seesion= await registration_schema.updateOne({"Email_id":req.body.Email_id},{$unset:{"session_token":""}})
                res.json({"message":"you logout successfully"})
             }
             else{
                res.json({"message":"Plz login"})
             }


           }
           else{
            res.json({"message":"not allowd"})
           }


        }catch{
            res.status(500).send()

        }
     }




})
















    module.exports=signup_router