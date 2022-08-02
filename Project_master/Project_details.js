const express = require("express");
const project_details_router= express.Router();
const registration_schema = require("../db/registration_schema");
const project_session_joi= require("../joi_validation/project_session_joi")
const Task_master = require("../db/Tasks_schema")
const Project_master = require("../db/Project_schema");
const project_update_joi = require("../joi_validation/project_update_joi");
//const { json } = require("body-parser");
const project_status_joi = require("../joi_validation/project_status_joi")

let date = new Date()

project_details_router.get("/project/details",async (req,res)=>{
    let {error,value} = await project_session_joi.project_session_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})
    }
    else{
    let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
    if(login_checking != 0){
        let collections = await Project_master.aggregate([{
                $lookup: {
                    from: "task_masters",
                    localField: "Project_id",
                    foreignField: "Project_id",
                    as: "Task_detalis"
                }
            }])
             let Filter =[]
             collections.forEach(item =>{
                if(item.Task_detalis != 0){
                  Filter.push({
                    "Project_id":item.Project_id,
                    "Project_name":item.Project_name,
                    "Project_description":item.Project_description,
                    "Access":item.Access,
                    "Task_detalis":item.Task_detalis,

                  })
                }
             })
            
       res.json(Filter)


    }
    else{
        res.json({"message":"plz log in"})
    }



    }
})
project_details_router.put("/project_update", async(req,res)=>{
    let {error, value} = await project_update_joi.project_update_joi.validate(req.body)

        if(error){
             res.json({"message":error.message})
            }
        
    else{
    let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
     if(login_checking !=0){
       
        
        let project_checkin = await Project_master.find({"Project_id":req.body.Project_id,"Email_id":req.body.Email_id})
        if(project_checkin.length != 0){
         let UpdateTime = date.getTime();
         let Project_name_update = await Project_master.updateOne({"Project_id":req.body.Project_id},{$set:{"Project_name":req.body.Project_name, 
         "Project_description":req.body.Project_description, "Updatedat":UpdateTime}})
         res.json({"message":"Updated"})

         }
         else{
            res.json({"message":"check your project_id and Email"})
         }
     
     }
     else{
        res.json({"message":"plz log in"})
     }


    }
})

project_details_router.delete("/delete", async(req,res)=>{
    let {error, value} = await project_update_joi.project_update_joi.validate(req.body)

        if(error){
             res.json({"message":error.message})
            }
        else{
            let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
     if(login_checking !=0){
            let project_checkin = await Project_master.find({"Project_id":req.body.Project_id,"Email_id":req.body.Email_id})
            if(project_checkin.length != 0){
            await Project_master.deleteOne({"Project_id":req.body.Project_id})
            await Task_master.deleteMany({"Project_id":req.body.Project_id})
            
            res.json({"message":"project delete"})

        }
        else if (project_checkin == 0){
            res.json({"message":"Project not exist"})
        }

        }
        else{
            res.json({"message":"plz login"})
        }

    }

})

project_details_router.post("/statuschange",async(req,res)=>{
    let {error,value}= await project_status_joi.project_status_joi.validate(req.body)
    if(error){
         res.json({"message":error.message})
    }
    else{
        let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
        if(login_checking !=0){
        let project_checkin = await Project_master.find({"Project_id":req.body.Project_id,"Email_id":req.body.Email_id})
        if(project_checkin !=0){
       let Project_name_update = await Project_master.updateOne({"Project_id":req.body.Project_id},{$set:{"Status":req.body.Status}})
        res.json({"message":"status updated"})
    }

        }
        else{
            res.json({"message":"plz login"})
        }
    
    
    
    
    }

})




module.exports=project_details_router