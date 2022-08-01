const mongoose = require("mongoose");
const registration_schema  = new mongoose.Schema({
    "Email_id":{
        type:String,
        unique:true,
        

    },
    "Password":{
        type:String,
        
    },
    "First_name":{
        type:String,
        
    },
    "Last_name":{
        type:String,
    },
    "session_token":{
        type:String,
    }

})
module.exports = mongoose.model("User_registration",registration_schema)