const joi = require("joi");
let task_joi = new joi.object({
    "Email_id":joi.string().email().required(),
    "session_token":joi.string().required(),
    "Project_id":joi.number().required(),
    "Task_name":joi.string().required(),
    "Task_description":joi.string().required()

})


module.exports={
    task_joi
}