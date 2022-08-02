const joi = require("joi");
let task_update_joi = new joi.object({
    
    
    "Task_id":joi.number().required(),
    "Project_id":joi.number().required(),
    "Email_id":joi.string().required(),
    "session_token":joi.string().required(),
    "Task_name":joi.string(),
    "Task_description":joi.string(),

})

module.exports = {task_update_joi}