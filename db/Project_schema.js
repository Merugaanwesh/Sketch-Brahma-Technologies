const mongoose = require("mongoose");
let Project_master = new mongoose.Schema({
    "Email_id":{
       type:String,
       
    },
    "Project_id":{
        type:Number,
        unique:true,
    },
    "Project_name":{
        type:String,
    },
    "Project_description":{
        type:String,
    },
    "Access":{
        type:String,
    },
    "Createdat":{
        type:Date,
    },
    "Updatedat":{
        type:Date,
    },
    "Status":{
        type:String
    }

})

module.exports = mongoose.model("Project_master",Project_master)