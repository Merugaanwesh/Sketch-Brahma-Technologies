const express = require("express");
const mongoose = require("mongoose");
const Project_master = require("./db/Project_schema")
const app = express();
const bodyparser =require("body-parser");
const registration_schema = require("./db/registration_schema")
const signup_router = require("./registration_router/registration_router")
const create_project_router = require("./Project_master/create_project")
const Task_master = require("./db/Tasks_schema")
const project_details_router = require("./Project_master/Project_details")
const task_master_router = require("./Task_master/create_task")
const mongooseURL = "mongodb://localhost:27017/sketch";
mongoose.connect(mongooseURL);
app.use(bodyparser.json());
app.use("/sketch",signup_router);
app.use("/project",create_project_router)
app.use("/task",task_master_router)
app.use("/project_details",project_details_router)
app.listen(3000,console.log("server is runing"))




