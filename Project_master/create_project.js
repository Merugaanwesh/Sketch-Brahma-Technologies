const express = require("express");
const create_project_router = express.Router();
const Project_master = require("../db/Project_schema");
const project_joi = require("../joi_validation/project_joi");
const registration_schema = require("../db/registration_schema");
const project_session_joi= require("../joi_validation/project_session_joi")
let date = new Date()

create_project_router.post("/createproject", async (req,res)=>{
    let {error,value} = await project_joi.project_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})

    }
    else{
        let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
       //console.log(login_checking != 0);
        if(login_checking != 0){
            let gettime = date.getTime()
            let data_insert ={
                  "Email_id":req.body.Email_id,
                  "Project_id":Date.now(),
                   "Project_name":req.body.Project_name,
                   "Project_description":req.body.Project_description,
                   "Access":"Private",
                   "Status":"Open",
                   "Createdat":gettime,
                   "Updatedat":gettime
                }
            let data = new Project_master(data_insert)
             data.save().then(response=>{
               res.json({"status":200,"message":"project create susscfuly",Project_id:response.Project_id})
             }).catch(error=>{
                    res.json({"message":error.message})
        })

        }
        else{
            res.json({"message":"plz login"})

        }
    }
})

create_project_router.post("/projectlisting", async (req,res)=>{
    //console.log(req.body);

    let {error,value} = await project_session_joi.project_session_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})
    }
    else{
     let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
      if(login_checking !=0){
          let projectlist = await Project_master.find(
                              {"Email_id":req.body.Email_id},
                              {"Project_id": 1, "Email_id": 1, "Project_name": 1, _id:0})

                    
                              res.json(projectlist)
         }
      else{
        res.json({"message":"plz login"})
      }

    }

})





module.exports=create_project_router