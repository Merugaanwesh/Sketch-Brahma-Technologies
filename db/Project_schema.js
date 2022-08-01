const mongoose = require("mongoose");
let Project_master = new mongoose.Schema({
    "Project_id":{
        type:Number,
        unique:true,
    },
    "Project_name":{
        type:String,
    },
    "Project description":{
        type:String,
    },
    "Access":{
        type:String,
    },
    "Createat":{
        type:Date,
    },
    "Updateat":{
        type:Date,
    }

})

module.exports = mongoose.model("Project_master",Project_master)