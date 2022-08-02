const express = require("express");
const task_master_router= express.Router();
const Task_master = require("../db/Tasks_schema");
const task_joi = require("../joi_validation/task_joi");
//const project_session_joi= require("../joi_validation/project_session_joi");
const registration_schema = require("../db/registration_schema");
//const { response } = require("express");
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
                "Status":"Processing",
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

module.exports=task_master_router
