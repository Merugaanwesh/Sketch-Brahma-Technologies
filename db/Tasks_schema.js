const mongoose = require("mongoose")
let Task_master = new mongoose.Schema({
   "Project_id":{
        type:Number,
    },
  "Task_id":{
    type:Number,
    unique:true,

  },
  "Task_name":{
    type:String,
  },
  "Task_description":{
    type:String,
  },
  "Status":{
     type:String,
     //match:/Notstarted  Processing  Finished Pending Resume/,
  },
  "Createdat":{
    type:Date,
  },
  "Updatedat":{
    type:Date,
  }
})

module.exports=mongoose.model("Task_master",Task_master)