const express = require("express");
const mongoose = require("mongoose");
const Project_master = require("./db/Project_schema")
const app = express();
const bodyparser =require("body-parser");
const registration_schema = require("./db/registration_schema")
const signup_router = require("./registration_router/registration_router")
const mongooseURL = "mongodb://localhost:27017/sketch";
mongoose.connect(mongooseURL);
app.use(bodyparser.json());
app.use("/sketch",signup_router);
app.listen(3000,console.log("server is runing"))




