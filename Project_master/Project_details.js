const express = require("express");
const project_details_router= express.Router();
const registration_schema = require("../db/registration_schema");
const project_session_joi= require("../joi_validation/project_session_joi")
const Task_master = require("../db/Tasks_schema")
const Project_master = require("../db/Project_schema");

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

module.exports=project_details_router