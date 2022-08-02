const express = require("express");
const task_master_router= express.Router();
const Task_master = require("../db/Tasks_schema");
const task_joi = require("../joi_validation/task_joi");
//const project_session_joi= require("../joi_validation/project_session_joi");
const registration_schema = require("../db/registration_schema");
const task_status_joi = require("../joi_validation/task_status_joi")
//const { response } = require("express");
const task_update_joi = require("../joi_validation/task_update_joi")
let date = new Date()


task_master_router.post("/createtask", async (req ,res)=>{
    let {error,value} = await task_joi.task_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})

    }
    else{
    let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
        if(login_checking !=0){
            let randomvalue = Math.random()*10
            let getseconds = date.getSeconds()*randomvalue
            let task_id = getseconds.toString().split("").reverse().slice(1,6).join("")
            let gettime = date.getTime()
            let dateinsert = {
                "Project_id":req.body.Project_id,
                "Task_id":task_id,
                "Task_name":req.body.Task_name,
                "Task_description":req.body.Task_description,
                "Status":"open",
                "Createdat":gettime,
                "Updatedat":gettime
            }
            let data = new Task_master(dateinsert)
            data.save().then(response=>{
                     res.json(response)
            }).catch(error=>{
               res.json({"message":error.message})
              // console.log(error);
            })

        }
        else{
            res.json({"message":"plz log in"})
        }
    }
})
task_master_router.put("/update_task", async(req,res)=>{
    let {error, value}= await task_update_joi.task_update_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})
    }
    else{
        let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
     if(login_checking !=0){
        let task_checkin = await Task_master.find({"Project_id":req.body.Project_id,"Task_id":req.body.Task_id})
        if(task_checkin !=0){
            let updatedat_time = date.getTime();
         await Task_master.updateOne({"Task_id":req.body.Task_id},{$set:{
            "Task_name":req.body.Task_name,
            "Task_description":req.body.Task_description,
            "Updatedat":updatedat_time
         }})
         res.json({"message":"taks updated"})
        }
        else{
            res.json({"message":"check your project_id and task_id"})

        }
     }
     else{
        res.json({"message":"plz login"})
     }
    }

})

task_master_router.delete("/task_delete", async(req,res)=>{
    let {error, value}= await task_update_joi.task_update_joi.validate(req.body)
    if(error){
        res.json({"message":error.message})
    }
    else{
        let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
        if(login_checking !=0){
        let task_checkin = await Task_master.find({"Project_id":req.body.Project_id,"Task_id":req.body.Task_id})
        if(task_checkin !=0){
            
        let task_delet = await Task_master.deleteOne({"Task_id":req.body.Task_id})
        res.json({"message":"taks deleted"})
        }
        else{
            res.json({"message":"check your project_id and task_id"})

        }
     }
     else{
        res.json({"message":"plz login"})
     }   
    }

})







task_master_router.post("/task_statuschange",async(req,res)=>{
    let {error,value}= await task_status_joi.task_status_joi.validate(req.body)
    if(error){
         res.json({"message":error.message})
    }
    else{
        let login_checking = await  registration_schema.find({"session_token":req.body.session_token , "Email_id": req.body.Email_id})
        if(login_checking !=0){
        let project_checkin = await Task_master.find({"Project_id":req.body.Project_id,"Task_id":req.body.Task_id})
        if(project_checkin !=0){
       let Project_name_update = await Task_master.updateOne({"Task_id":req.body.Task_id},{$set:{"Status":req.body.Status}})
        res.json({"message":"status updated"})
    }
    else{
        res.json({"message":"check your project_id and task_id"})
    }

        }
        else{
            res.json({"message":"plz login"})
        }
    
    
    
    
    }

})







module.exports=task_master_router
